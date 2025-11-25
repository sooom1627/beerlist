"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2, Check, X } from "lucide-react";
import type { Beer } from "../types/beers.types";

interface BeerSlotCardProps {
  beer: Beer | null;
  slotIndex: number;
  onToggleAvailability: () => void;
  onToggleNew: () => void;
  onEdit: () => void;
  onReplace: () => void;
}

export function BeerSlotCard({
  beer,
  slotIndex,
  onToggleAvailability,
  onToggleNew,
  onEdit,
  onReplace,
}: BeerSlotCardProps) {
  if (!beer) {
    return (
      <Card className="border-dashed border-2 opacity-50">
        <CardHeader>
          <CardTitle className="text-sm">スロット {slotIndex + 1}</CardTitle>
          <CardDescription>空き</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onEdit} variant="outline" className="w-full">
            ビールを追加
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`transition-all duration-200 ${
        !beer.isAvailable ? "opacity-60" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded p-1.5 flex items-center justify-center border border-border">
                <img
                  src={beer.image}
                  alt={beer.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold line-clamp-1">
                {beer.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {beer.brewery} / {beer.location}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-1">
                style: <span className="font-medium">{beer.style}</span> / alcohol:{" "}
                <span className="font-medium">{beer.alcohol}%</span>
              </p>
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
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
          {beer.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Glass</span>
              <span className="font-medium">¥{beer.price.glass}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Pint</span>
              <span className="font-medium">¥{beer.price.pint}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            onClick={onToggleAvailability}
            variant={beer.isAvailable ? "outline" : "default"}
            size="sm"
            className="flex-1"
          >
            {beer.isAvailable ? (
              <>
                <X className="h-4 w-4 mr-1" />
                完売に変更
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-1" />
                OKに変更
              </>
            )}
          </Button>
          <Button onClick={onToggleNew} variant="outline" size="sm">
            {beer.isNew ? (
              <>
                <X className="h-4 w-4 mr-1" />
                Newを解除
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-1" />
                Newに変更
              </>
            )}
          </Button>
          <Button onClick={onEdit} variant="outline" size="sm" className="flex-1">
            <Edit2 className="h-4 w-4 mr-1" />
            編集
          </Button>
          <Button onClick={onReplace} variant="destructive" size="sm" className="flex-1">
            <Edit2 className="h-4 w-4 mr-1" />
            入れ替え
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

