"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a] px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/10 mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Something went wrong!
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
            一時的な問題が発生しました。<br />
            もう一度お試しください。
          </p>
        </div>

        <div className="pt-2">
          <Button 
            onClick={() => reset()} 
            variant="outline" 
            className="min-w-[140px]"
          >
            再読み込み
          </Button>
        </div>
      </div>
    </div>
  );
}

