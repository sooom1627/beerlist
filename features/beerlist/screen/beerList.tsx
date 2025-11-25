"use client";

import { useBeers } from "../hooks/useBeers";
import { useBeersRealtimeSync } from "../hooks/useBeersRealtimeSync";
import { BeerListSkeleton, BeerCard } from "../components/beer-list";

/**
 * ビールリスト画面（顧客向け）
 *
 * 責務:
 * - ビール一覧の表示
 * - リアルタイム更新の管理
 * - ローディング状態の表示
 *
 * 使用コンポーネント:
 * - BeerListSkeleton: ローディング表示
 * - BeerCard: ビールカード表示
 *
 * 使用フック:
 * - useBeers: ビールデータ取得
 * - useBeersRealtimeSync: リアルタイム同期
 */
export function BeerList() {
  const { data: beerSlots, isLoading } = useBeers();

  // リアルタイム更新のサブスクリプション
  useBeersRealtimeSync();

  if (isLoading) {
    return <BeerListSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beerSlots?.map((beer, index) => {
          if (!beer) return null;
          return <BeerCard key={beer.id} beer={beer} index={index} />;
        })}
      </div>
    </div>
  );
}
