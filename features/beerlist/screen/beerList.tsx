"use client";

import { useBeers } from "../hooks/useBeers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function BeerList() {
  const { data: beerSlots, isLoading } = useBeers();
  const queryClient = useQueryClient();

  // リアルタイム更新のサブスクリプション
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('public:beers')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'beers',
        },
        () => {
          // 変更があったらキャッシュを無効化して再取得
          queryClient.invalidateQueries({ queryKey: ["beers"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (isLoading) {
    return <div className="w-full text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {beerSlots?.map((beer) => {
          if (!beer) return null;
          
          return (
            <Card
              key={beer.id}
              className={`group relative transition-all duration-200 hover:shadow-md ${
                !beer.isAvailable ? "opacity-60" : ""
              }`}
            >
              <CardHeader className="pb-0 px-4 pt-4">
                <div className="flex items-start justify-start gap-3 mb-2">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded p-1.5 flex items-center justify-center border border-border">
                      {beer.image ? (
                        <img
                          src={beer.image}
                          alt={beer.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold line-clamp-1">
                      {beer.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {beer.brewery} / {beer.location}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">
                      style: <span className="font-medium">{beer.style}</span> / alcohol: <span className="font-medium">{beer.alcohol}%</span>
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 space-y-2">
                <p className="text-xs text-muted-foreground leading-snug">
                  {beer.description}
                </p>
                <div className="flex items-center justify-between pt-1.5 border-t border-border">
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
                  {!beer.isAvailable && (
                    <span className="text-xs text-muted-foreground">
                      完売
                    </span>
                  )}
                </div>
              </CardContent>
              <span className="text-7xl font-black opacity-15 text-zinc-900 dark:text-zinc-400 absolute top-2 right-2">
                {beer.tapNumber}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
