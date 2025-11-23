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
import { cn } from "@/lib/utils";

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
    // Loading stateもミニマルに
    return (
      <div className="w-full max-w-4xl mx-auto px-2 py-12 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-zinc-100 dark:bg-zinc-900/50 animate-pulse rounded-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beerSlots?.map((beer) => {
          if (!beer) return null;
          
          return (
            <Card
              key={beer.id}
              className={cn(
                "group relative",
                "border-none shadow-none bg-transparent", // ミニマル化: 枠線なし、背景透明、ホバーエフェクト削除
                !beer.isAvailable && "opacity-40 grayscale"
              )}
            >
              <CardHeader className="pb-2 px-4 pt-4">
                <div className="flex items-start gap-4">
                  {/* Image: 枠線を消してシンプルに */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center p-1 bg-white dark:bg-zinc-900 rounded-sm shadow-sm">
                    {beer.image ? (
                      <img
                        src={beer.image}
                        alt={beer.name}
                        className="w-full h-full object-contain mix-blend-multiply bg-white  dark:mix-blend-normal rounded-sm p-0.5"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-sm" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <CardTitle className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-1">
                        {beer.name}
                      </CardTitle>
                    </div>

                    <CardDescription className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-medium">
                      {beer.brewery} <span className="text-zinc-300 dark:text-zinc-700 mx-1">/</span> {beer.location}
                    </CardDescription>
                    
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                      <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] tracking-wider font-medium uppercase">
                        {beer.style}
                      </span>
                      <span className="font-mono text-[10px]">
                        ABV {beer.alcohol}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-4 pb-4 pt-2 space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {beer.description}
                </p>
                
                <div className="flex items-end justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/50 border-dashed">
                  <div className="flex items-center gap-6 font-mono text-xs">
                    <div className="flex flex-col">
                      <span className="text-zinc-400 text-[10px] uppercase mb-0.5">Glass</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">¥{beer.price.glass}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-400 text-[10px] uppercase mb-0.5">Pint</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">¥{beer.price.pint}</span>
                    </div>
                  </div>
                  
                  {!beer.isAvailable && (
                    <span className="text-xs font-medium text-zinc-400 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                      SOLD OUT
                    </span>
                  )}
                </div>
              </CardContent>

              {/* Tap Number: よりアーティスティックに配置 */}
              <span className="absolute -top-2 -right-2 text-[8rem] leading-none font-black text-zinc-200/80 dark:text-zinc-800/80 -z-10 select-none pointer-events-none">
                {beer.tapNumber}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
