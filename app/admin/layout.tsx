import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Suspense } from "react";

import { Beer, Menu, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            {/* Navigation Menu (Always Hamburger) */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-ml-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">メニューを開く</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                      <Store className="h-4 w-4" />
                      <span>TOPページ</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                      <Beer className="h-4 w-4" />
                      <span>ビール設定</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 w-full max-w-5xl p-5">
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <Link
            href="/admin/terms"
            className="text-muted-foreground hover:underline"
          >
            利用規約
          </Link>
          <Link
            href="/admin/release-notes"
            className="text-muted-foreground hover:underline"
          >
            リリースノート
          </Link>
          <span className="text-muted-foreground">v1.5.1</span>
        </footer>
      </div>
    </main>
  );
}
