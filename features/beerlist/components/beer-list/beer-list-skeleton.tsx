/**
 * ビールリストのローディング表示コンポーネント
 * スケルトンスクリーンでローディング状態を表示
 */
export function BeerListSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-12 space-y-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-32 bg-zinc-100 dark:bg-zinc-900/50 animate-pulse rounded-sm"
        />
      ))}
    </div>
  );
}
