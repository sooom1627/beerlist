"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crop as CropIcon } from "lucide-react";

interface ImageCropDialogProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

const ASPECT_RATIO = 1; // 正方形
const MIN_DIMENSION = 200;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropDialog({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ダイアログが開かれた時に状態をリセット
  useEffect(() => {
    if (isOpen) {
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [isOpen]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const crop = centerAspectCrop(naturalWidth, naturalHeight, ASPECT_RATIO);
    setCrop(crop);
  }, []);

  const getCroppedImg = useCallback(
    (
      image: HTMLImageElement,
      pixelCrop: PixelCrop,
      fileName: string
    ): Promise<File> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = pixelCrop.width * scaleX * pixelRatio;
      canvas.height = pixelCrop.height * scaleY * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      const cropX = pixelCrop.x * scaleX;
      const cropY = pixelCrop.y * scaleY;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            const file = new File([blob], fileName, {
              type: "image/jpeg",
            });
            resolve(file);
          },
          "image/jpeg",
          0.95
        );
      });
    },
    []
  );

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop) return;

    try {
      const croppedFile = await getCroppedImg(
        imgRef.current,
        completedCrop,
        `cropped-${Date.now()}.jpg`
      );
      onCropComplete(croppedFile);
      onClose();
    } catch (error) {
      console.error("Error cropping image:", error);
      alert("画像のクロップに失敗しました");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>画像をクロップ</DialogTitle>
          <DialogDescription>
            画像をドラッグして範囲を選択し、確定ボタンを押してください
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {imageSrc && (
            <div className="flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
                minHeight={MIN_DIMENSION}
                className="max-w-full"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imageSrc}
                  onLoad={onImageLoad}
                  className="max-h-[400px] w-auto"
                />
              </ReactCrop>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            type="button"
            onClick={handleCropComplete}
            disabled={!completedCrop}
          >
            <CropIcon className="h-4 w-4 mr-2" />
            確定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

