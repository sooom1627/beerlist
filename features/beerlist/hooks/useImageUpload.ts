import { useState, useRef, useEffect, useCallback } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif"
];

/**
 * 画像アップロード機能を提供するカスタムフック
 * - 画像プレビュー管理
 * - ファイルバリデーション
 * - Blob URLのクリーンアップ
 */
export function useImageUpload(initialImage: string | null = null) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Blob URLのクリーンアップ
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): string | null => {
    const file = e.target.files?.[0];
    if (!file) return null;

    // ファイルサイズチェック
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`画像ファイルは${MAX_IMAGE_SIZE / 1024 / 1024}MB以下である必要があります`);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return null;
    }

    // 画像形式チェック
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert("JPEG、PNG、WebP形式の画像ファイルを選択してください");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return null;
    }

    // ファイルを設定し、プレビューを表示
    const blobUrl = URL.createObjectURL(file);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    previewUrlRef.current = blobUrl;
    setImagePreview(blobUrl);
    setImageFile(file);

    return file.name;
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const cleanupImageState = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const resetImage = useCallback((newImage: string | null = null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(newImage);
  }, []);

  return {
    imagePreview,
    imageFile,
    fileInputRef,
    setImagePreview,
    handleFileChange,
    handleRemoveImage,
    cleanupImageState,
    resetImage,
    allowedTypes: ALLOWED_IMAGE_TYPES,
  };
}
