import { useState } from "react";
import type { Beer } from "../types/beers.types";
import type { BeerFormData } from "../types/beer-form.types";
import { useUpsertBeer } from "./useBeers";
import { uploadBeerImage } from "../api/beers.api";

/**
 * Toast通知の型定義
 */
export interface ToastNotification {
  type: 'success' | 'error';
  message: string;
}

/**
 * useBeerSlotManagementのオプション
 */
interface UseBeerSlotManagementOptions {
  onNotify?: (notification: ToastNotification) => void;
}

/**
 * ビールスロット管理フック
 * 管理画面でのビールスロット操作ロジックを提供
 *
 * 機能:
 * - スロット編集/入れ替え管理
 * - 在庫ステータス切り替え
 * - 新着ステータス切り替え
 * - フォーム送信処理
 * - 通知コールバック
 */
export function useBeerSlotManagement(
  beerSlots: (Beer | null)[] | undefined,
  options?: UseBeerSlotManagementOptions
) {
  const { onNotify } = options ?? {};
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
        onNotify?.({
          type: 'success',
          message: '在庫ステータスを更新しました',
        });
      } catch (error) {
        console.error("Failed to toggle availability:", error);
        onNotify?.({
          type: 'error',
          message: '在庫ステータスの更新に失敗しました',
        });
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
        onNotify?.({
          type: 'success',
          message: '新着ステータスを更新しました',
        });
      } catch (error) {
        console.error("Failed to toggle new status:", error);
        onNotify?.({
          type: 'error',
          message: '新着ステータスの更新に失敗しました',
        });
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
        onNotify?.({
          type: 'success',
          message: 'ビール情報を保存しました',
        });
      } catch (error) {
        console.error("Failed to submit form:", error);
        onNotify?.({
          type: 'error',
          message: '保存に失敗しました',
        });
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
