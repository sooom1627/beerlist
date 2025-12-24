/**
 * 新着ビールバッジコンポーネント
 * アニメーション付きの "New Tap!" バッジを表示
 */
export function NewBadge() {
  return (
    <div className="absolute -top-0 left-6 z-10 flex items-center gap-1.5 mb-1.5 animate-in fade-in slide-in-from-left-2 duration-500">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <span className="text-[10px] font-bold tracking-[0.2em] text-amber-600 uppercase">
        New Tap!
      </span>
    </div>
  );
}
