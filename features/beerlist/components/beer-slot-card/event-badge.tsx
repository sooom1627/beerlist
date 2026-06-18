/**
 * イベントビールバッジコンポーネント
 * モノトーン基調のサイトデザインに合わせた、黒背景のソリッドなピル型デザイン
 */
export function EventBadge() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 animate-in fade-in slide-in-from-left-2 duration-500">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
      </span>
      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-white uppercase">
        Event Tap!
      </span>
    </div>
  );
}
