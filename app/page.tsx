import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BeerList } from "@/features/beerlist/screen/beerList";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Neigbor Today's Beer List</Link>
            </div>
              <Suspense>
                <AuthButton />
              </Suspense>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-4 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 ">
          <h1 className="text-2xl font-bold">Today's Beer List</h1>
          <BeerList />
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
