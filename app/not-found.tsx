import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a] px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-8xl font-black tracking-tighter text-zinc-200 dark:text-zinc-800 select-none">
            404
          </h1>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Page Not Found
          </h2>
        </div>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          お探しのページは見つかりませんでした。<br />
          しかし、美味しいビールはここにあります。
        </p>

        <div className="pt-4">
          <Button asChild variant="default" className="min-w-[140px]">
            <Link href="/">
              メニューに戻る
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </Suspense>
  );
}

