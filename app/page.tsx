import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BeerList } from "@/features/beerlist/screen/beerList";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <header className="w-full border-b border-gray-100 dark:border-zinc-900">
        <div className="w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Today's Beer List
            </h1>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <Suspense>
                <AuthButton />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full flex flex-col items-center py-8">
      <BeerList />
      </div>

      <footer className="w-full border-t border-gray-100 dark:border-zinc-900 mt-auto">
        <div className="w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-6">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            © 2024 Beer List
          </p>
        </div>
      </footer>
    </main>
  );
}
