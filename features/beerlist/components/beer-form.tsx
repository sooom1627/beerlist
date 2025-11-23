"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { beerFormSchema, type BeerFormData } from "../types/beer-form.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Beer } from "../types/beers.types";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface BeerFormProps {
  beer: Beer | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BeerFormData) => void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function BeerForm({ beer, isOpen, onClose, onSubmit }: BeerFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    beer?.image || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BeerFormData>({
    resolver: zodResolver(beerFormSchema),
    defaultValues: beer
      ? {
          id: beer.id,
          image: beer.image,
          brewery: beer.brewery,
          name: beer.name,
          style: beer.style,
          location: beer.location,
          description: beer.description,
          price: {
            glass: beer.price.glass,
            pint: beer.price.pint,
          },
          alcohol: beer.alcohol,
          isAvailable: beer.isAvailable,
          createdAt: beer.createdAt,
        }
      : {
          image: "",
          brewery: "",
          name: "",
          style: "",
          location: "",
          description: "",
          price: {
            glass: 0,
            pint: 0,
          },
          alcohol: 0,
          isAvailable: true,
          createdAt: "",
        },
  });

  useEffect(() => {
    if (beer?.image) {
      setImagePreview(beer.image);
    } else if (!isOpen) {
      setImagePreview(null);
      setImageFile(null);
    }
    // createdAtが空の場合は現在の日付を設定
    if (!beer && isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setValue("createdAt", today);
    }
  }, [beer, isOpen, setValue]);

  // Blob URLのクリーンアップ
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`画像ファイルは${MAX_IMAGE_SIZE / 1024 / 1024}MB以下である必要があります`);
      fileInputRef.current!.value = "";
      return;
    }

    // 画像形式チェック
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert("JPEG、PNG、WebP形式の画像ファイルを選択してください");
      fileInputRef.current!.value = "";
      return;
    }

    // ファイルを設定し、プレビューを表示
    const blobUrl = URL.createObjectURL(file);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    previewUrlRef.current = blobUrl;
    setImagePreview(blobUrl);
    setImageFile(file);
    setValue("image", file.name, { shouldValidate: true });
  };

  const handleRemoveImage = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImagePreview(null);
    setImageFile(null);
    setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (data: BeerFormData) => {
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
    onSubmit(submitData);
    reset();
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleClose = () => {
    reset();
    if (previewUrlRef.current && !beer?.image) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImagePreview(beer?.image || null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {beer ? "ビール情報を更新" : "新しいビールを追加"}
          </DialogTitle>
          <DialogDescription>
            {beer
              ? "ビールの情報を編集してください"
              : "新しいビールの情報を入力してください"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">画像</Label>
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                onChange={handleFileChange}
                className="hidden"
                id="image-file"
              />
              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative inline-block group">
                    <div className="relative w-24 h-24 border-2 border-border rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center shadow-sm">
                      <img
                        src={imagePreview}
                        alt="プレビュー"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      画像を変更
                    </Button>
                  </div>
                  {imageFile && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      <span>ファイル: {imageFile.name}</span>
                      <span>サイズ: {(imageFile.size / 1024).toFixed(1)} KB</span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground font-medium">
                    画像を選択してください
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPEG、PNG、WebP形式（最大5MB）
                  </p>
                </div>
              )}
              {errors.image && (
                <p className="text-sm text-destructive">{errors.image.message}</p>
              )}
              <input type="hidden" {...register("image")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="brewery">ブルワリー名</Label>
              <Input id="brewery" {...register("brewery")} />
              {errors.brewery && (
                <p className="text-sm text-destructive">
                  {errors.brewery.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ビール名</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">スタイル</Label>
              <Input id="style" {...register("style")} />
              {errors.style && (
                <p className="text-sm text-destructive">{errors.style.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">場所</Label>
              <Input id="location" {...register("location")} />
              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="alcohol">アルコール度数 (%)</Label>
              <Input
                id="alcohol"
                type="number"
                step="0.1"
                {...register("alcohol", { valueAsNumber: true })}
              />
              {errors.alcohol && (
                <p className="text-sm text-destructive">
                  {errors.alcohol.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <textarea
              id="description"
              {...register("description")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glass">Glass価格 (¥)</Label>
              <Input
                id="glass"
                type="number"
                {...register("price.glass", { valueAsNumber: true })}
              />
              {errors.price?.glass && (
                <p className="text-sm text-destructive">
                  {errors.price.glass.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pint">Pint価格 (¥)</Label>
              <Input
                id="pint"
                type="number"
                {...register("price.pint", { valueAsNumber: true })}
              />
              {errors.price?.pint && (
                <p className="text-sm text-destructive">
                  {errors.price.pint.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              キャンセル
            </Button>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

