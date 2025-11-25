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
}

/**
 * ビールスロットカードコンポーネント
 *
 * 責務:
 * - 管理画面でのビールスロット表示
 * - 空きスロットまたはビール情報の表示
 * - ビール操作（在庫切り替え、新着切り替え、編集、入れ替え）
 *
 * 使用コンポーネント:
 * - EmptySlot: 空きスロット表示
 * - BeerInfo: ビール情報表示
 * - PriceDisplay: 価格表示
 * - BeerActions: アクションボタン群
 * - NewBadge: 新着バッジ
 */
export function BeerSlotCard({
  beer,
  slotIndex,
  onToggleAvailability,
  onToggleNew,
  onEdit,
  onReplace,
}: BeerSlotCardProps) {
  // 空きスロットの場合
  if (!beer) {
    return <EmptySlot slotIndex={slotIndex} onEdit={onEdit} />;
  }

  // ビール情報がある場合
  return (
    <Card
      className={`group relative transition-all duration-200 ${
        !beer.isAvailable ? "opacity-60" : ""
      }`}
    >
      {/* ビール情報 */}
      <BeerInfo beer={beer} slotIndex={slotIndex} />

      {/* カードコンテンツ */}
      <CardContent className="space-y-3">
        {/* 説明 */}
        <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
          {beer.description}
        </p>

        {/* 価格表示 */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
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
        />

        {/* 新着バッジ */}
        {beer.isNew && <NewBadge />}
      </CardContent>
    </Card>
  );
}
