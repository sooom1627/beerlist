"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// 画像パスのインポート（Next.jsの静的インポートを使用すると最適化される）
import openingImage from "@/app/image.png";

interface OpeningAnimationProps {
  /**
   * If true, the animation will always play regardless of session storage.
   * Default: false
   */
  alwaysShow?: boolean;
}

export function OpeningAnimation({ alwaysShow = false }: OpeningAnimationProps) {
  const [show, setShow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // alwaysShowがfalseの場合のみ、セッションストレージをチェック
    if (!alwaysShow) {
      const hasSeen = sessionStorage.getItem("hasSeenOpening");
      if (hasSeen) {
        setShow(false);
        setIsVisible(false);
        return;
      }
      // 表示済みフラグをセット
      sessionStorage.setItem("hasSeenOpening", "true");
    }

    // アニメーションシーケンス
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2秒間表示

    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 3000); // フェードアウト完了後にDOMから削除（2s + 1s fadeout）

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [alwaysShow]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative w-64 h-64 md:w-96 md:h-96 animate-in fade-in zoom-in duration-1000">
        <Image
          src={openingImage}
          alt="Opening Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
