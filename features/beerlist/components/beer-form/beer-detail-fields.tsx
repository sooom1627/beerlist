import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "../common";
import type { BeerFormData } from "../../types/beer-form.types";

interface BeerDetailFieldsProps {
  register: UseFormRegister<BeerFormData>;
  errors: FieldErrors<BeerFormData>;
}

/**
 * ビールの詳細情報入力フィールド
 * - スタイル
 * - 場所
 * - アルコール度数
 */
export function BeerDetailFields({
  register,
  errors,
}: BeerDetailFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 sm:col-span-1">
        <FormField
          id="style"
          label="スタイル"
          placeholder="スタイルを入力してください"
          error={errors.style?.message}
          {...register("style")}
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <FormField
          id="location"
          label="場所"
          placeholder="場所を入力してください"
          error={errors.location?.message}
          {...register("location")}
        />
      </div>

      <div className="col-span-2">
        <FormField
          id="alcohol"
          label="アルコール度数 (%)"
          type="number"
          step="0.1"
          placeholder="アルコール度数を入力してください"
          error={errors.alcohol?.message}
          {...register("alcohol", { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}
