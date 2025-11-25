import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "../common";
import type { BeerFormData } from "../../types/beer-form.types";

interface BeerBasicInfoFieldsProps {
  register: UseFormRegister<BeerFormData>;
  errors: FieldErrors<BeerFormData>;
}

/**
 * ビールの基本情報入力フィールド
 * - ビール名
 * - ブルワリー名
 */
export function BeerBasicInfoFields({
  register,
  errors,
}: BeerBasicInfoFieldsProps) {
  return (
    <div className="grid gap-6">
      <FormField
        id="name"
        label="ビール名"
        placeholder="ビール名を入力してください"
        inputClassName="h-12 text-lg bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4"
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        id="brewery"
        label="ブルワリー名"
        placeholder="ブルワリー名を入力してください"
        error={errors.brewery?.message}
        {...register("brewery")}
      />
    </div>
  );
}
