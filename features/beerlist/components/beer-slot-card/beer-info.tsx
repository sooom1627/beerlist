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
                    <path 
                      d="M17 7V13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13V7C7 7 8.5 8.5 12 8.5C15.5 8.5 17 7 17 7Z" 
                      fill={beer.color} 
                    />
                    <path 
                      d="M17 7C17 7 15.5 8.5 12 8.5C8.5 8.5 7 7 7 7V6C7 6 8.5 7.5 12 7.5C15.5 7.5 17 6 17 6V7Z" 
                      fill="white"
                      fillOpacity="0.4"
                    />
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
