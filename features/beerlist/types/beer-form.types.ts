import { z } from "zod";
import type { Beer } from "./beers.types";

export const beerFormSchema = z.object({
  id: z.number().optional(),
  image: z.string().optional(),
  brewery: z.string().min(1, "ブルワリー名は必須です"),
  name: z.string().min(1, "ビール名は必須です"),
  style: z.string().min(1, "スタイルは必須です"),
  color: z.string().optional().nullable(),
  location: z.string().min(1, "場所は必須です"),
  description: z.string().min(1, "説明は必須です"),
  price: z.object({
    glass: z.number().min(0, "Glass価格は0以上である必要があります"),
    pint: z.number().min(0, "Pint価格は0以上である必要があります"),
  }),
  alcohol: z.number().min(0).max(100, "アルコール度数は0-100の範囲である必要があります"),
  isAvailable: z.boolean(),
  createdAt: z.string(),
  isNew: z.boolean(),
}).refine(
  (data) => {
    // 新規作成時（idがない場合）は画像ファイルまたは画像URLが必要
    // 編集時は既存の画像URLがあればOK
    return true; // 画像の存在チェックはフォーム送信時に別途行う
  },
  {
    message: "画像ファイルを選択してください",
    path: ["image"],
  }
);

export type BeerFormData = z.infer<typeof beerFormSchema> & {
  imageFile?: File;
};

export type BeerSlot = Beer | null;

// Supabase Storage用の画像アップロード情報
export interface ImageUploadInfo {
  file: File;
  previewUrl: string;
}

