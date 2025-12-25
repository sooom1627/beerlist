interface PriceDisplayProps {
  glassPrice: number;
  pintPrice: number;
  variant?: "compact" | "detailed";
}

/**
 * ビール価格表示の共通コンポーネント
 * グラスとパイントの価格を表示
 */
export function PriceDisplay({
  glassPrice,
  pintPrice,
  variant = "detailed"
}: PriceDisplayProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Glass</span>
          <span className="font-medium">¥{glassPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Pint</span>
          <span className="font-medium">¥{pintPrice.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 font-mono text-xs">
      <div className="flex flex-col">
        <span className="text-zinc-400 text-[10px] uppercase mb-0.5">
          Glass(
          <span className="text-zinc-400 text-[10px] lowercase">
            250ml
          </span>
          )
        </span>
        <span className="font-medium text-zinc-900">
          ¥{glassPrice === 0 ? ' -' : glassPrice.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-zinc-400 text-[10px] uppercase mb-0.5">
          Pint(
          <span className="text-zinc-400 text-[10px] lowercase">
            470ml
          </span>
          )
        </span>
        <span className="font-medium text-zinc-900">
          ¥{pintPrice === 0 ? ' -' : pintPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
