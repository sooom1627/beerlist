import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BeerList } from "@/features/beerlist/screen/beerList";
import { BackgroundTexture } from "@/components/background-texture";
import { OpeningAnimation } from "@/components/opening-animation";
import { InstagramFloatingButton } from "@/components/instagram-floating-button";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] relative overflow-hidden selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <OpeningAnimation alwaysShow={true} />
      <BackgroundTexture />
      <InstagramFloatingButton />
      
      {/* Minimal Header Section */}
      <header className="relative z-10 w-full pt-16 pb-8 flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none mix-blend-difference">
            NEIGHBOR
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-800" />
            <p className="text-xs font-mono tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase">
              Craftbeer & Grill
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center pb-20">
        <div className="w-full max-w-screen-xl mx-auto">
          <BeerList />
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full py-8 border-t border-zinc-100 dark:border-zinc-900">
        <div className="w-full flex justify-center items-center gap-6 px-4">
          <ThemeSwitcher />
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
        <p className="text-center text-[10px] text-zinc-400 mt-4 font-mono">
          © 2024 NEIGHBOR. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
