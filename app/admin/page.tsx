"use client";

import { BeerSlotCard } from "@/features/beerlist/components/beer-slot-card";
import { BeerForm } from "@/features/beerlist/components/beer-form";
import { useBeers } from "@/features/beerlist/hooks/useBeers";
import { useBeerSlotManagement } from "@/features/beerlist/hooks/useBeerSlotManagement";
import type { Beer } from "@/features/beerlist/types/beers.types";

const MAX_SLOTS = 8;

/**
 * 管理画面ページ
 *
 * 責務:
 * - ビールスロットの管理画面を提供
 * - スロット一覧表示
 * - ビール編集フォームの表示制御
 *
 * 使用コンポーネント:
 * - BeerSlotCard: スロットカード表示
 * - BeerForm: ビール編集フォーム
 *
 * 使用フック:
 * - useBeers: ビールデータ取得
 * - useBeerSlotManagement: スロット管理ロジック
 */
export default function AdminPage() {
  const { data: beerSlots, isLoading } = useBeers();

  const displaySlots: (Beer | null)[] = beerSlots || Array(MAX_SLOTS).fill(null);

  const {
    isFormOpen,
    currentBeer,
    handleToggleAvailability,
    handleToggleNew,
    handleEdit,
    handleReplace,
    handleFormSubmit,
    handleCloseForm,
  } = useBeerSlotManagement(beerSlots);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-2">ビールリスト管理</h1>
        <p className="text-sm text-muted-foreground">
          最大8つのビールスロットを管理できます。各スロットにビールを追加・編集・削除できます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displaySlots.map((beer, index) => (
          <BeerSlotCard
            key={index}
            beer={beer}
            slotIndex={index}
            onToggleAvailability={() => handleToggleAvailability(index)}
            onToggleNew={() => handleToggleNew(index)}
            onEdit={() => handleEdit(index)}
            onReplace={() => handleReplace(index)}
          />
        ))}
      </div>

      <BeerForm
        beer={currentBeer}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
