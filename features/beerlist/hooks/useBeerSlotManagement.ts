import { useState } from "react";
import type { Beer } from "../types/beers.types";
import type { BeerFormData } from "../types/beer-form.types";
import { useUpsertBeer } from "./useBeers";
import { uploadBeerImage } from "../api/beers.api";

/**
 * ビールスロット管理フック
 * 管理画面でのビールスロット操作ロジックを提供
 *
 * 機能:
 * - スロット編集/入れ替え管理
 * - 在庫ステータス切り替え
 * - 新着ステータス切り替え
 * - フォーム送信処理
 */
export function useBeerSlotManagement(beerSlots: (Beer | null)[] | undefined) {
  const upsertBeerMutation = useUpsertBeer();
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<'update' | 'replace'>('update');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 在庫ステータスを切り替え
   */
  const handleToggleAvailability = async (slotIndex: number) => {
    const beer = beerSlots?.[slotIndex];
    if (beer) {
      try {
        const { createdAt, ...beerData } = beer;
        await upsertBeerMutation.mutateAsync({
          ...beerData,
          isAvailable: !beer.isAvailable,
        });
      } catch (error) {
        console.error("Failed to toggle availability:", error);
        alert("在庫ステータスの切り替えに失敗しました。");
      }
    }
  };

  /**
   * 新着ステータスを切り替え
   */
  const handleToggleNew = async (slotIndex: number) => {
    const beer = beerSlots?.[slotIndex];
    if (beer) {
      try {
        const { createdAt, ...beerData } = beer;
        await upsertBeerMutation.mutateAsync({
          ...beerData,
          isNew: !beer.isNew,
        });
      } catch (error) {
        console.error("Failed to toggle new status:", error);
        alert("新着ステータスの切り替えに失敗しました。");
      }
    }
  };

  /**
   * 編集モードでフォームを開く
   */
  const handleEdit = (slotIndex: number) => {
    setEditingSlotIndex(slotIndex);
    setEditMode('update');
    setIsFormOpen(true);
  };

  /**
   * 入れ替えモードでフォームを開く
   */
  const handleReplace = (slotIndex: number) => {
    setEditingSlotIndex(slotIndex);
    setEditMode('replace');
    setIsFormOpen(true);
  };

  /**
   * フォーム送信処理
   */
  const handleFormSubmit = async (data: BeerFormData) => {
    if (editingSlotIndex !== null) {
      try {
        setIsSubmitting(true);
        let imageUrl = data.image ?? "";

        if (data.imageFile) {
          imageUrl = await uploadBeerImage(data.imageFile);
        }

        const tapNumber = editingSlotIndex + 1;
        await upsertBeerMutation.mutateAsync({
          id: data.id,
          tapNumber,
          image: imageUrl,
          brewery: data.brewery,
          name: data.name,
          style: data.style,
          location: data.location,
          description: data.description,
          price: data.price,
          alcohol: data.alcohol,
          isAvailable: data.isAvailable,
          isNew: data.isNew,
        });
        setEditingSlotIndex(null);
        setIsFormOpen(false);
      } catch (error) {
        console.error("Failed to submit form:", error);
        alert("保存に失敗しました。");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /**
   * フォームを閉じる
   */
  const handleCloseForm = () => {
    if (!isSubmitting) {
      setEditingSlotIndex(null);
      setIsFormOpen(false);
    }
  };

  /**
   * 現在編集中のビール情報を取得
   */
  const getCurrentBeer = (): Beer | null => {
    if (editingSlotIndex === null || !beerSlots) return null;
    return editMode === 'update' ? beerSlots[editingSlotIndex] : null;
  };

  return {
    editingSlotIndex,
    isFormOpen,
    isSubmitting,
    currentBeer: getCurrentBeer(),
    handleToggleAvailability,
    handleToggleNew,
    handleEdit,
    handleReplace,
    handleFormSubmit,
    handleCloseForm,
  };
}
