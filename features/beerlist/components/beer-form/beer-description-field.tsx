import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import type { BeerFormData } from "../../types/beer-form.types";

interface BeerDescriptionFieldProps {
  register: UseFormRegister<BeerFormData>;
  errors: FieldErrors<BeerFormData>;
}

/**
 * ビールの説明入力フィールド
 * テキストエリアで複数行の入力を可能にする
 */
export function BeerDescriptionField({
  register,
  errors,
}: BeerDescriptionFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="description"
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1"
      >
        Description
      </Label>
      <textarea
        id="description"
        {...register("description")}
        className="w-full min-h-[120px] rounded-xl bg-muted/20 border-transparent focus:border-primary focus:bg-background px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 resize-none transition-all"
        placeholder="ビールの特徴や味わいについて..."
      />
      {errors.description && (
        <p className="text-xs text-destructive pl-1">
          {errors.description.message}
        </p>
      )}
    </div>
  );
}
