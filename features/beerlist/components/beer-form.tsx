"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { beerFormSchema, type BeerFormData } from "../types/beer-form.types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Beer } from "../types/beers.types";
import { useImageUpload } from "../hooks/useImageUpload";
import { useBeerFormData } from "../hooks/useBeerFormData";
import {
  ImageUploadField,
  BeerBasicInfoFields,
  BeerDetailFields,
  BeerPriceFields,
  BeerDescriptionField,
} from "./beer-form/index";

interface BeerFormProps {
  beer: Beer | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BeerFormData) => Promise<void>;
}

/**
 * ビール編集/新規作成フォーム
 *
 * 責務:
 * - ビール情報の入力フォームを提供
 * - フォームバリデーション
 * - 画像アップロード管理
 *
 * 使用コンポーネント:
 * - ImageUploadField: 画像アップロード
 * - BeerBasicInfoFields: 基本情報（名前、ブルワリー）
 * - BeerDetailFields: 詳細情報（スタイル、場所、アルコール度数）
 * - BeerPriceFields: 価格（グラス、パイント）
 * - BeerDescriptionField: 説明
 */
export function BeerForm({ beer, isOpen, onClose, onSubmit }: BeerFormProps) {
  const {
    imagePreview,
    imageFile,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    cleanupImageState,
    resetImage,
    allowedTypes,
  } = useImageUpload(beer?.image || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BeerFormData>({
    resolver: zodResolver(beerFormSchema),
    defaultValues: beer ? {
      id: beer.id,
      image: beer.image,
      brewery: beer.brewery,
      name: beer.name,
      style: beer.style,
      color: beer.color,
      location: beer.location,
      description: beer.description,
      price: {
        glass: beer.price.glass,
        pint: beer.price.pint,
      },
      alcohol: beer.alcohol,
      isAvailable: beer.isAvailable,
      createdAt: beer.createdAt,
      isNew: beer.isNew,
      isEventBeer: beer.isEventBeer,
    } : {
      image: "",
      brewery: "",
      name: "",
      style: "",
      color: "",
      location: "",
      description: "",
      price: {
        glass: 0,
        pint: 0,
      },
      alcohol: 0,
      isAvailable: true,
      createdAt: "",
      isNew: false,
      isEventBeer: false,
    },
  });

  // フォームデータの初期化とリセット
  useBeerFormData({
    beer,
    isOpen,
    reset,
    onImageReset: resetImage,
  });

  const handleFileChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = handleFileChange(e);
    if (fileName) {
      setValue("image", fileName, { shouldValidate: true });
    }
  };

  const handleRemoveImageWithValidation = () => {
    handleRemoveImage();
    setValue("image", "");
  };

  const handleFormSubmit = async (data: BeerFormData) => {
    // 新規作成時は画像ファイルまたは既存の画像URLが必要
    if (!beer && !imageFile && !imagePreview) {
      alert("画像ファイルを選択してください");
      return;
    }

    // 画像ファイルが選択されている場合は、それを含めて送信
    const submitData: BeerFormData = {
      ...data,
      image: imagePreview || data.image || "",
      imageFile: imageFile || undefined,
    };

    try {
      await onSubmit(submitData);
      // 成功時のみフォームをリセット
      reset();
      cleanupImageState();
      resetImage(null);
      // onCloseは親コンポーネントで呼ばれるため、ここでは呼ばない
    } catch (error) {
      // エラーは親コンポーネントで処理されるため、ここでは何もしない
      console.error("Form submission error:", error);
    }
  };

  const handleClose = () => {
    reset();
    cleanupImageState();
    resetImage(beer?.image || null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) return;
    }}>
      <DialogContent
        className="sm:max-w-[600px] w-11/12 max-h-[90vh] p-0 gap-0 overflow-hidden rounded-2xl bg-background shadow-2xl [&>button]:hidden border-none flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/10 backdrop-blur-xl sticky top-0 z-10">
          <DialogTitle className="text-lg font-bold tracking-tight">
            {beer ? "Edit Beer" : "New Beer"}
          </DialogTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted/20 transition-colors"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">閉じる</span>
          </Button>
        </div>

        {/* フォーム本体 */}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
          <form id="beer-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* 画像アップロード */}
            <ImageUploadField
              imagePreview={imagePreview}
              error={errors.image?.message}
              fileInputRef={fileInputRef}
              allowedTypes={allowedTypes}
              onFileChange={handleFileChangeWithValidation}
              onRemoveImage={handleRemoveImageWithValidation}
            />
            <input type="hidden" {...register("image")} />

            {/* 基本情報 */}
            <BeerBasicInfoFields register={register} errors={errors} />

            {/* 詳細情報 */}
            <BeerDetailFields 
              register={register} 
              errors={errors} 
              setValue={setValue}
              watch={watch}
            />

            {/* 価格 */}
            <BeerPriceFields register={register} errors={errors} />

            {/* 説明 */}
            <BeerDescriptionField register={register} errors={errors} />
          </form>
        </div>

        {/* フッター */}
        <div className="p-4 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-11 rounded-xl border-muted-foreground/20 hover:bg-muted/50 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="beer-form"
              className="flex-[2] h-11 rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              {beer ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
