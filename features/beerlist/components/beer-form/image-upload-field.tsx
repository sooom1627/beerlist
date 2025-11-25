import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  imagePreview: string | null;
  error?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  allowedTypes: string[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

/**
 * 画像アップロードフィールドコンポーネント
 * - 画像プレビュー表示
 * - ファイル選択
 * - 画像削除
 */
export function ImageUploadField({
  imagePreview,
  error,
  fileInputRef,
  allowedTypes,
  onFileChange,
  onRemoveImage,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(",")}
        onChange={onFileChange}
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
                  onClick={onRemoveImage}
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
      {error && (
        <p className="text-xs text-center text-destructive font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
