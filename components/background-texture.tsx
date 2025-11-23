export function BackgroundTexture() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* ノイズテクスチャ: SVGフィルターを使用して確実に描画 */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* トップライト効果: SVGグラデーションを使用 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-60 dark:opacity-40">
        <svg
          viewBox="0 0 1000 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYTop slice"
        >
          <ellipse 
            cx="500" 
            cy="0" 
            rx="400" 
            ry="400" 
            fill="url(#light-gradient)" 
          />
          <defs>
            <radialGradient
              id="light-gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(500 0) rotate(90) scale(400 400)"
            >
              <stop stopColor="currentColor" className="text-zinc-200 dark:text-zinc-800" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" className="text-zinc-200 dark:text-zinc-800" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

