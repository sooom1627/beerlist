import Image from "next/image";

interface BeerImageProps {
  src: string | null;
  alt: string;
  size?: "small" | "medium" | "large";
  priority?: boolean;
}

const sizeConfig = {
  small: {
    container: "w-12 h-12",
    imageSize: "48px",
  },
  medium: {
    container: "w-16 h-16",
    imageSize: "64px",
  },
  large: {
    container: "w-32 h-32 sm:w-40 sm:h-40",
    imageSize: "160px",
  },
} as const;

/**
 * ビール画像表示の共通コンポーネント
 * 画像がない場合はプレースホルダーを表示
 */
export function BeerImage({
  src,
  alt,
  size = "medium",
  priority = false
}: BeerImageProps) {
  const config = sizeConfig[size];

  return (
    <div className={`${config.container} bg-white dark:bg-zinc-900 rounded-sm shadow-sm flex items-center justify-center p-1`}>
      {src ? (
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={config.imageSize}
            className="object-contain mix-blend-multiply bg-white dark:mix-blend-normal rounded-sm p-0.5"
            priority={priority}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-sm" />
      )}
    </div>
  );
}
