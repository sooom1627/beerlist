/**
 * 新着ビールバッジコンポーネント
 * アニメーション付きの "New Tap!" バッジを表示
 */
export function NewBadge() {
  return (
    <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2 duration-500">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-amber-600 uppercase">
        New!
      </span>
    </div>
  );
}
