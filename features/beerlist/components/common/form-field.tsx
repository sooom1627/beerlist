import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  error?: string;
  inputClassName?: string;
}

/**
 * フォーム入力フィールドの共通コンポーネント
 * ラベル、入力欄、エラーメッセージを統一されたスタイルで表示
 */
export function FormField({
  id,
  label,
  error,
  inputClassName = "h-11 text-base bg-muted/20 border-transparent focus:border-primary focus:bg-background transition-all rounded-xl px-4",
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1"
      >
        {label}
      </Label>
      <Input
        id={id}
        className={inputClassName}
        {...inputProps}
      />
      {error && (
        <p className="text-xs text-destructive pl-1">{error}</p>
      )}
    </div>
  );
}
