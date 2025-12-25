"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";

export function InstagramFloatingButton() {
  return (
    <Link
      href="https://www.instagram.com/neighbor_2024/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200 border border-zinc-200"
      aria-label="Visit Instagram"
    >
      <Instagram className="w-6 h-6 text-zinc-900" />
    </Link>
  );
}

