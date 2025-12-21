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
            <div className="flex items-center gap-2 mt-1.5">
               {/* ビールカラー */}
               {beer.color && (
                <div
                  className="w-4 h-4 rounded-full border border-black/10 shadow-sm shrink-0"
                  style={{ backgroundColor: beer.color }}
                  title="Beer Color"
                />
              )}
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span>style:</span>
                <span className="font-medium">{beer.style}</span>
                <span>/</span>
                <span>alcohol:</span>
                <span className="font-medium">{beer.alcohol}%</span>
              </div>
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
