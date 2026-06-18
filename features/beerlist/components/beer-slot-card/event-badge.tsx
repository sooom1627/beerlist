/**
 * イベントビールバッジコンポーネント
 * フラットなダークグレー地に小さくモノスペースで Event Tap を置き、
 * 細い純白の光が時折スッと横切るだけのシンプルで洗練された特別感を出す。
 * 光は静止時には画面外で待機するため、初期状態では何も乗らない。
 */
export function EventBadge() {
  return (
    <span className="relative inline-flex items-center overflow-hidden rounded-sm bg-zinc-800 px-1.5 py-0.5 animate-in fade-in slide-in-from-left-2 duration-500">
      <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-[0.2em] text-zinc-200 uppercase">
        Event Tap
      </span>

      {/* 細い純白の光がスッと横切る（静止時は画面外で待機） */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
    </span>
  );
}
