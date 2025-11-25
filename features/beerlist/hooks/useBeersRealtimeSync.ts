import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

/**
 * ビールデータのリアルタイム同期フック
 * Supabaseのリアルタイム機能を使用してデータベースの変更を監視し、
 * 変更があればキャッシュを無効化して再取得する
 */
export function useBeersRealtimeSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("public:beers")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "beers",
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
}
