import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "../common";
import type { BeerFormData } from "../../types/beer-form.types";

interface BeerPriceFieldsProps {
  register: UseFormRegister<BeerFormData>;
  errors: FieldErrors<BeerFormData>;
}

/**
 * ビールの価格入力フィールド
 * - グラス価格
 * - パイント価格
 */
export function BeerPriceFields({
  register,
  errors,
}: BeerPriceFieldsProps) {
  return (
    <div className="space-y-1.5 col-span-2">
      <div className="space-y-4">
        <FormField
          id="price.glass"
          label="グラス-価格"
          type="number"
          placeholder="グラスの価格を入力してください"
          inputClassName="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4 text-right"
          error={errors.price?.glass?.message}
          {...register("price.glass", { valueAsNumber: true })}
        />
        <FormField
          id="price.pint"
          label="パイント-価格"
          type="number"
          placeholder="パイントの価格を入力してください"
          inputClassName="h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4 text-right"
          error={errors.price?.pint?.message}
          {...register("price.pint", { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}
