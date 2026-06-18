/**
 * イベントビールバッジコンポーネント
 * 黒を抑えたグラファイトグレーのソリッド地に、小さくモノスペースで Event Tap を配置。
 * 細い純白の光が時折スッと横切る（静止時は画面外で待機）、
 * シンプルで洗練された特別感を出す。
 */
export function EventBadge() {
  return (
    <span className="relative inline-flex items-center overflow-hidden rounded-sm bg-zinc-700 px-2.5 py-0.5 animate-in fade-in slide-in-from-left-2 duration-500">
      <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-[0.2em] text-zinc-50 uppercase">
        Event Tap
      </span>

      {/* 細い純白の光がスッと横切る（静止時は画面外で待機） */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </span>
  );
}
