import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BeerImage, PriceDisplay } from "../common";
import type { Beer } from "../../types/beers.types";

interface BeerCardProps {
  beer: Beer;
  index: number;
}

/**
 * ビールカードコンポーネント（顧客向け表示）
 * - ビール画像
 * - 基本情報（名前、ブルワリー、場所）
 * - スタイルとアルコール度数
 * - 説明
 * - 価格
 * - 在庫切れ表示
 * - 新着バッジ
 */
export function BeerCard({ beer, index }: BeerCardProps) {
  return (
    <Card
      className={cn(
        "group relative",
        "border-none shadow-none bg-transparent",
        !beer.isAvailable && "opacity-40 grayscale"
      )}
    >
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-start gap-4">
          {/* 画像 */}
          <BeerImage
            src={beer.image}
            alt={beer.name}
            size="medium"
            priority={index < 4}
          />

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-baseline justify-between">
              <CardTitle className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-1">
                {beer.name}
              </CardTitle>
            </div>

            <CardDescription className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-medium">
              {beer.brewery}{" "}
              <span className="text-zinc-300 dark:text-zinc-700 mx-1">
                /
              </span>{" "}
              {beer.location}
            </CardDescription>

            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] tracking-wider font-medium uppercase flex items-center gap-1.5">
                {beer.color && (
                  <span
                    className="w-2 h-2 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: beer.color }}
                    aria-hidden="true"
                  />
                )}
                {beer.style}
              </span>
              <span className="font-mono text-[10px]">
                ABV {beer.alcohol}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-2 space-y-4">
        {/* 説明 */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
          {beer.description}
        </p>

        {/* 価格 */}
        <div className="flex items-end justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/50 border-dashed">
          <PriceDisplay
            glassPrice={beer.price.glass}
            pintPrice={beer.price.pint}
            variant="detailed"
          />

          {/* 在庫切れ表示 */}
          {!beer.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <span className="text-xl font-bold text-zinc-500 border-4 border-zinc-500 px-6 py-3 rounded-md -rotate-12 opacity-90 uppercase tracking-widest shadow-sm bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                Sold Out
              </span>
            </div>
          )}

          {/* 新着バッジ */}
          {beer.isNew && (
            <div className="absolute -top-2 left-4 z-10 flex items-center gap-1.5 mb-1.5 animate-in fade-in slide-in-from-left-2 duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[12px] font-bold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase">
                New Tap!
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Tap Number */}
      <span
        className="absolute -top-2 -right-1 text-[8rem] leading-none font-black text-zinc-200/80 dark:text-zinc-800/80 -z-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        {beer.tapNumber}
      </span>
    </Card>
  );
}
