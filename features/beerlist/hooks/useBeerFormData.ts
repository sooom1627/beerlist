import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import type { Beer } from "../types/beers.types";
import type { BeerFormData } from "../types/beer-form.types";

/**
 * beer-formのデフォルト値を生成
 */
export function getDefaultBeerFormValues(beer: Beer | null): BeerFormData {
  if (beer) {
    return {
      id: beer.id,
      image: beer.image,
      brewery: beer.brewery,
      name: beer.name,
      style: beer.style,
      location: beer.location,
      description: beer.description,
      price: {
        glass: beer.price.glass,
        pint: beer.price.pint,
      },
      alcohol: beer.alcohol,
      isAvailable: beer.isAvailable,
      createdAt: beer.createdAt,
      isNew: beer.isNew,
    };
  }

  return {
    image: "",
    brewery: "",
    name: "",
    style: "",
    location: "",
    description: "",
    price: {
      glass: 0,
      pint: 0,
    },
    alcohol: 0,
    isAvailable: true,
    createdAt: "",
    isNew: false,
  };
}

interface UseBeerFormDataProps {
  beer: Beer | null;
  isOpen: boolean;
  reset: UseFormReset<BeerFormData>;
  onImageReset: (image: string | null) => void;
}

/**
 * beer-formのデータ管理フック
 * - フォームが開かれた時の初期化処理
 * - ビール情報が変更された時のリセット処理
 */
export function useBeerFormData({
  beer,
  isOpen,
  reset,
  onImageReset,
}: UseBeerFormDataProps) {
  useEffect(() => {
    if (isOpen) {
      if (beer) {
        reset(getDefaultBeerFormValues(beer));
        onImageReset(beer.image);
      } else {
        reset({
          ...getDefaultBeerFormValues(null),
          createdAt: new Date().toISOString().split("T")[0],
        });
        onImageReset(null);
      }
    }
  }, [beer, isOpen, reset, onImageReset]);
}
