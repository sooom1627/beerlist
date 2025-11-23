import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BeerList } from "@/features/beerlist/screen/beerList";
import { BackgroundTexture } from "@/components/background-texture";
import { GridPattern } from "@/components/ui/grid-pattern";
import { OpeningAnimation } from "@/components/opening-animation";
import { InstagramFloatingButton } from "@/components/instagram-floating-button";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 relative overflow-hidden">
      <OpeningAnimation alwaysShow={true} />
      <BackgroundTexture />
      <InstagramFloatingButton />
      
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          "opacity-50 dark:opacity-30"
        )}
      />

      <div className="relative z-10 flex-1 w-full flex flex-col items-center py-8 gap-4">
        <div className="flex flex-col items-center justify-center py-6 space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white">
            NEIGHBOR
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-zinc-300 dark:bg-zinc-700" />
            <p className="text-xs md:text-sm font-medium tracking-[0.3em] text-zinc-500 dark:text-zinc-400 uppercase whitespace-nowrap">
              Today's Beer List
            </p>
            <div className="h-[1px] w-8 bg-zinc-300 dark:bg-zinc-700" />
          </div>
        </div>
        <BeerList />
      </div>

      <footer className="w-full border-t border-gray-100 dark:border-zinc-900 mt-auto">
        <div className="w-full flex justify-center items-center gap-4 px-4 py-6">
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </footer>
    </main>
  );
}
