"use client";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BeerImage, PriceDisplay } from "../common";
import type { Beer } from "../../types/beers.types";

interface BeerCardProps {
  beer: Beer;
  index: number;
}

/**
 * ビールカードコンポーネント（顧客向け表示）
 *
 * 特徴:
 * - シンプル＆モダンなフラットデザイン
 * - タップNo.は右上にミニマル配置
 * - スマホスクロール最適化
 * - スクロール時の浮かび上がりアニメーション
 */
export function BeerCard({ beer, index }: BeerCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  });

  return (
    <article
      ref={ref}
      className={cn(
        "group relative",
        "rounded-xl overflow-hidden",
        // GPUアクセラレーション・スクロール最適化
        "transform-gpu will-change-transform",
        // スクロール時の浮かび上がりアニメーション
        "transition-all duration-500 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3",
        // ホバーエフェクト（デスクトップのみ）
        isVisible && "md:hover:-translate-y-0.5",
        // スマホ用タッチフィードバック
        "active:scale-[0.995]",
        !beer.isAvailable && "opacity-50 grayscale"
      )}
      style={{
        transitionDelay: isVisible ? "0ms" : `${index * 60}ms`,
      }}
    >
      {/* タップナンバー - 右上にモノクロでさりげなく */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-right">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          Tap
        </span>
        <div className="text-2xl sm:text-3xl font-black text-zinc-600 leading-none -mt-1">
          {String(beer.tapNumber).padStart(2, "0")}
        </div>
      </div>

      {/* 新着バッジ */}
      {beer.isNew && (
        <div className="absolute top-0 left-3 sm:top-0 sm:left-4 z-10 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-amber-600 uppercase">
            New Tap!
          </span>
        </div>
      )}

      <div className="relative p-4 sm:p-5 space-y-3 sm:space-y-4">
        {/* ヘッダー: 画像 + 基本情報 */}
        <div className="flex items-start gap-3 sm:gap-4">
          {/* 画像エリア */}
          <div className="relative shrink-0">
            <BeerImage
              src={beer.image}
              alt={beer.name}
              size="medium"
              priority={index < 4}
            />
          </div>

          {/* 基本情報 */}
          <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5 pt-0.5">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 leading-tight line-clamp-2 pr-12">
              {beer.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 font-medium">
              <span className="text-zinc-700">
                {beer.brewery}
              </span>
              <span className="mx-1 sm:mx-1.5 opacity-40">•</span>
              {beer.location}
            </p>

            {/* スタイル・ABV・カラー */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-600">
                {beer.style}
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-300">|</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                {beer.alcohol}%
              </span>
              {beer.color && (
                <>
                  <span className="text-[10px] sm:text-[11px] text-zinc-300">|</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                    color:
                  </span>
                  <span
                    className="inline-flex w-5 h-3 sm:w-6 sm:h-3.5 rounded-full ring-1 ring-black/5"
                    style={{ backgroundColor: beer.color }}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* 説明 */}
        <p className="text-[13px] sm:text-sm text-zinc-600 leading-relaxed">
          {beer.description}
        </p>

        {/* 価格 */}
        <div className="pt-3 sm:pt-4 border-t border-zinc-100">
          <PriceDisplay
            glassPrice={beer.price.glass}
            pintPrice={beer.price.pint}
            variant="detailed"
          />
        </div>
      </div>

      {/* 在庫切れオーバーレイ */}
      {!beer.isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <span className="px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-zinc-500 border border-zinc-400">
            Sold Out
          </span>
        </div>
      )}
    </article>
  );
}
