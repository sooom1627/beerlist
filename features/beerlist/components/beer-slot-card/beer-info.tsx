import { CardHeader, CardTitle } from "@/components/ui/card";
import { BeerImage } from "../common";
import type { Beer } from "../../types/beers.types";

interface BeerInfoProps {
  beer: Beer;
  slotIndex: number;
}

/**
 * ビール情報表示コンポーネント（管理画面用）
 * - 画像
 * - 名前、ブルワリー、場所
 * - スタイル、アルコール度数、カラー
 * - タップナンバー（右上に配置）
 */
export function BeerInfo({ beer, slotIndex }: BeerInfoProps) {
  return (
    <CardHeader className="pb-2 relative">
      {/* タップナンバー - 右上にミニマル配置 */}
      <div className="absolute top-3 right-3 text-right">
        <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
          Tap
        </span>
        <div className="text-lg font-black text-zinc-600 leading-none -mt-0.5">
          {String(slotIndex + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex items-start gap-3 pr-12">
        <BeerImage src={beer.image} alt={beer.name} size="small" />

        <div className="flex-1 min-w-0 space-y-1">
          <CardTitle className="text-sm font-bold tracking-tight line-clamp-1 text-zinc-900">
            {beer.name}
          </CardTitle>

          <p className="text-[11px] text-zinc-500 font-medium">
            <span className="text-zinc-700">
              {beer.brewery}
            </span>
            <span className="mx-1 opacity-40">•</span>
            {beer.location}
          </p>

          {/* スタイル・ABV・カラー */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold text-zinc-600">
              {beer.style}
            </span>
            <span className="text-[10px] text-zinc-300">
              |
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              {beer.alcohol}%
            </span>
            {beer.color && (
              <>
                <span className="text-[10px] text-zinc-300">
                  |
                </span>
                <span
                  className="inline-flex w-4 h-2.5 rounded-full ring-1 ring-black/5"
                  style={{ backgroundColor: beer.color }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
