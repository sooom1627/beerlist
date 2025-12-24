"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PriceDisplay } from "./common";
import { EmptySlot, BeerInfo, BeerActions, NewBadge } from "./beer-slot-card/index";
import type { Beer } from "../types/beers.types";

interface BeerSlotCardProps {
  beer: Beer | null;
  slotIndex: number;
  onToggleAvailability: () => void;
  onToggleNew: () => void;
  onEdit: () => void;
  onReplace: () => void;
  onLoadFromDraft: () => void;
}

/**
 * ビールスロットカードコンポーネント（管理画面用）
 *
 * 責務:
 * - 管理画面でのビールスロット表示
 * - 空きスロットまたはビール情報の表示
 * - ビール操作（在庫切り替え、新着切り替え、編集、入れ替え）
 */
export function BeerSlotCard({
  beer,
  slotIndex,
  onToggleAvailability,
  onToggleNew,
  onEdit,
  onReplace,
  onLoadFromDraft,
}: BeerSlotCardProps) {
  // 空きスロットの場合
  if (!beer) {
    return (
      <EmptySlot
        slotIndex={slotIndex}
        onEdit={onEdit}
        onLoadFromDraft={onLoadFromDraft}
      />
    );
  }

  // ビール情報がある場合
  return (
    <Card
      className={`group relative transition-all duration-200 overflow-hidden ${
        !beer.isAvailable ? "opacity-60 grayscale" : ""
      }`}
    >
      {/* 新着バッジ */}
      {beer.isNew && <NewBadge />}

      {/* ビール情報 */}
      <BeerInfo beer={beer} slotIndex={slotIndex} />

      {/* カードコンテンツ */}
      <CardContent className="space-y-3 pt-0">
        {/* 説明 */}
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {beer.description}
        </p>

        {/* 価格表示 */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
          <PriceDisplay
            glassPrice={beer.price.glass}
            pintPrice={beer.price.pint}
            variant="compact"
          />
        </div>

        {/* アクションボタン */}
        <BeerActions
          beer={beer}
          onToggleAvailability={onToggleAvailability}
          onToggleNew={onToggleNew}
          onEdit={onEdit}
          onReplace={onReplace}
          onLoadFromDraft={onLoadFromDraft}
        />
      </CardContent>
    </Card>
  );
}
