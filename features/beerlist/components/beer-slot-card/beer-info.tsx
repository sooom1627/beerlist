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
                  className="flex items-center justify-center p-1 rounded-sm bg-muted/50 border border-border mr-1"
                  title="Beer Color"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
                    <path d="M9 12h6" />
                    <path d="M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
                    <path 
                      d="M8 21h8a2 2 0 0 0 2-2v-9H6v9a2 2 0 0 0 2 2z" 
                      fill={beer.color} 
                      stroke="none"
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
