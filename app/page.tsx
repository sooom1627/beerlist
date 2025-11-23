import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BeerList } from "@/features/beerlist/screen/beerList";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <div className="flex-1 flex flex-col w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 ">
          <h1 className="text-xl font-bold">Today's Beer List</h1>
          <BeerList />
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </footer>
      </div>
    </main>
  );
}
