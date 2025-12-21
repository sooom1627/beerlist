import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeerImage } from "../common";
import type { Beer } from "../../types/beers.types";
import { cn } from "@/lib/utils";

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
    <CardHeader 
      className="pb-2 transition-colors duration-300"
      style={beer.color ? {
        background: `linear-gradient(to right, ${beer.color}15 0%, transparent 100%)`,
        borderLeft: `4px solid ${beer.color}`
      } : undefined}
    >
      <div className="flex items-start justify-between mb-2 pl-2">
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
               <span 
                className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-medium uppercase",
                  !beer.color && "bg-muted text-muted-foreground"
                )}
                style={beer.color ? {
                  backgroundColor: `${beer.color}20`,
                  border: `1px solid ${beer.color}40`,
                  color: 'inherit'
                } : undefined}
               >
                 {beer.style}
               </span>
               <span className="text-[10px] text-muted-foreground font-mono">
                 ABV {beer.alcohol}%
               </span>
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
