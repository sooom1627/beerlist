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
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp","image/heic","image/heif"];

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
    if (isOpen) {
      if (beer) {
        reset({
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
        });
        setImagePreview(beer.image);
      } else {
        reset({
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
          createdAt: new Date().toISOString().split("T")[0],
        });
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [beer, isOpen, reset]);

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
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) return;
    }}>
      <DialogContent 
        className="sm:max-w-[600px] w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden rounded-2xl bg-background shadow-2xl [&>button]:hidden border-none flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
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

        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
          <form id="beer-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            
            {/* 画像アップロードセクション */}
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                onChange={handleFileChange}
                className="hidden"
                id="image-file"
              />
              
              <div className="flex justify-center">
                {imagePreview ? (
                  <div className="relative group">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-border shadow-sm transition-all hover:shadow-md bg-white">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full shadow-lg"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8 rounded-full shadow-lg"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/5 hover:bg-muted/10 flex flex-col items-center justify-center cursor-pointer transition-all group"
                  >
                    <div className="p-3 rounded-full bg-muted/20 group-hover:scale-110 transition-transform duration-200 mb-2">
                      <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">写真を追加</span>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-xs text-center text-destructive font-medium animate-in fade-in slide-in-from-top-1">{errors.image.message}</p>
              )}
              <input type="hidden" {...register("image")} />
            </div>

            {/* 基本情報セクション */}
            <div className="grid gap-6">
              <div className="grid gap-1.5">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">ビール名</Label>
                <Input 
                  id="name" 
                  {...register("name")} 
                  className="h-12 text-lg bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4" 
                  placeholder="ビール名を入力してください"
                />
                {errors.name && <p className="text-xs text-destructive pl-1">{errors.name.message}</p>}
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="brewery" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">ブルワリー名</Label>
                <Input 
                  id="brewery" 
                  {...register("brewery")} 
                  className="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4"
                  placeholder="ブルワリー名を入力してください"
                />
                {errors.brewery && <p className="text-xs text-destructive pl-1">{errors.brewery.message}</p>}
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <Label htmlFor="style" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">スタイル</Label>
                <Input 
                  id="style" 
                  {...register("style")} 
                  className="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4"
                  placeholder="スタイルを入力してください"
                />
                {errors.style && <p className="text-xs text-destructive pl-1">{errors.style.message}</p>}
              </div>

              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">場所</Label>
                <Input 
                  id="location" 
                  {...register("location")} 
                  className="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4"
                  placeholder="場所を入力してください"
                />
                {errors.location && <p className="text-xs text-destructive pl-1">{errors.location.message}</p>}
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="alcohol" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">アルコール度数 (%)</Label>
                <Input
                  id="alcohol"
                  type="number"
                  step="0.1"
                  {...register("alcohol", { valueAsNumber: true })}
                  className="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4 w-full"
                  placeholder="アルコール度数を入力してください"
                />
                {errors.alcohol && <p className="text-xs text-destructive pl-1">{errors.alcohol.message}</p>}
              </div>

              <div className="space-y-1.5 col-span-2">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="price.glass" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">グラス-価格</Label>
                    <Input
                      id="price.glass"
                      placeholder="グラスの価格を入力してください"
                      type="number"
                      {...register("price.glass", { valueAsNumber: true })}
                      className="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4 text-right"
                    />
                    {errors.price?.glass && (
                      <p className="text-xs text-destructive pl-1">{errors.price.glass.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="price.pint" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">パイント-価格</Label>
                    <Input
                      id="price.pint"
                      placeholder="パイントの価格を入力してください"
                      type="number"
                      {...register("price.pint", { valueAsNumber: true })}
                      className="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4 text-right"
                    />
                    {errors.price?.pint && (
                      <p className="text-xs text-destructive pl-1">{errors.price.pint.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">Description</Label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full min-h-[120px] rounded-xl bg-muted/20 border-transparent focus:border-primary focus:bg-background px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 resize-none transition-all"
                placeholder="ビールの特徴や味わいについて..."
              />
              {errors.description && (
                <p className="text-xs text-destructive pl-1">{errors.description.message}</p>
              )}
            </div>

          </form>
        </div>

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

