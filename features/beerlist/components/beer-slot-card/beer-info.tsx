import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeerImage } from "../common";
import type { Beer } from "../../types/beers.types";

interface BeerInfoProps {
  beer: Beer;
  slotIndex: number;
}

/**
 * ビール情報表示コンポーネント
 * - 画像
 * - 名前、ブルワリー、場所
 * - スタイル、アルコール度数
 * - スロット番号バッジ
 */
export function BeerInfo({ beer, slotIndex }: BeerInfoProps) {
  // 一意のIDを生成（スロットインデックスを使用）
  const clipPathId = `clip-circle-info-${slotIndex}`;

  return (
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1 min-w-0 pt-2">
          <BeerImage
            src={beer.image}
            alt={beer.name}
            size="small"
          />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold line-clamp-1">
              {beer.name}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {beer.brewery} / {beer.location}
            </CardDescription>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {beer.color && (
                <div 
                  className="flex items-center justify-center w-5 h-5 mr-1 shrink-0"
                  title="Beer Color"
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-sm"
                  >
                    <defs>
                      <clipPath id={clipPathId}>
                        <circle cx="12" cy="12" r="9" />
                      </clipPath>
                    </defs>
                    <g clipPath={`url(#${clipPathId})`}>
                      <rect x="2" y="2" width="20" height="20" fill={beer.color} opacity="0.2" />
                      <path 
                        d="M2 12C2 12 5 10 12 10C19 10 22 12 22 12V22H2V12Z" 
                        fill={beer.color} 
                      />
                    </g>
                    <circle cx="12" cy="12" r="9" stroke={beer.color} strokeWidth="1.5" opacity="0.5" />
                  </svg>
                </div>
              )}
              <span>style:</span>
              <span className="font-medium">{beer.style}</span>
              <span>/</span>
              <span>alcohol:</span>
              <span className="font-medium">{beer.alcohol}%</span>
            </div>
          </div>
        </div>
        <Badge
          variant={beer.isAvailable ? "default" : "secondary"}
          className="ml-2"
        >
          {slotIndex + 1}
        </Badge>
      </div>
    </CardHeader>
  );
}
