"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // デフォルトのキャッシュ時間を設定
        staleTime: 60 * 1000, // 1分
        gcTime: 5 * 60 * 1000, // 5分
        // ウィンドウフォーカス時に再取得するかどうか
        refetchOnWindowFocus: true, 
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
