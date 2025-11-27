"use client";

import { toast } from "sonner";
import { BeerSlotCard } from "@/features/beerlist/components/beer-slot-card";
import { BeerForm } from "@/features/beerlist/components/beer-form";
import { useBeers } from "@/features/beerlist/hooks/useBeers";
import { useBeerSlotManagement, type ToastNotification } from "@/features/beerlist/hooks/useBeerSlotManagement";
import { Beer as BeerType } from "@/features/beerlist/types/beers.types";
import { useCallback, useState } from "react";
import { DraftListManager, DraftSelectionDialog } from "@/features/beerlist/components/draft-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BeerIcon, ClipboardList } from "lucide-react";

const MAX_SLOTS = 8;

/**
 * 管理画面ページ
 *
 * 責務:
 * - ビールスロットの管理画面を提供
 * - スロット一覧表示
 * - ビール編集フォームの表示制御
 * - 操作結果のToast通知
 *
 * 使用コンポーネント:
 * - BeerSlotCard: スロットカード表示
 * - BeerForm: ビール編集フォーム
 *
 * 使用フック:
 * - useBeers: ビールデータ取得
 * - useBeerSlotManagement: スロット管理ロジック
 */
export default function AdminPage() {
  const { data: beerSlots, isLoading } = useBeers();
  const [draftDialogTarget, setDraftDialogTarget] = useState<number | null>(null);

  const displaySlots: (BeerType | null)[] = beerSlots || Array(MAX_SLOTS).fill(null);

  /**
   * Toast通知を表示するコールバック
   */
  const handleNotify = useCallback((notification: ToastNotification) => {
    if (notification.type === 'success') {
      toast.success(notification.message);
    } else {
      toast.error(notification.message);
    }
  }, []);

  const {
    isFormOpen,
    currentBeer,
    handleToggleAvailability,
    handleToggleNew,
    handleEdit,
    handleReplace,
    handleFormSubmit,
    handleCloseForm,
  } = useBeerSlotManagement(beerSlots, { onNotify: handleNotify });

  const handleOpenDraftDialog = (index: number) => {
    setDraftDialogTarget(index);
  };

  const handleCloseDraftDialog = () => {
    setDraftDialogTarget(null);
  };

  const handleDraftSuccess = () => {
    toast.success("下書きからビール情報を反映しました");
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6 pb-12">
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-2">ビールリスト管理</h1>
        <p className="text-sm text-muted-foreground">
          提供中のビールスロットと下書きの管理が行えます。
        </p>
      </div>

      <Tabs defaultValue="on-tap" className="w-full space-y-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="on-tap">
            <BeerIcon className="mr-2 h-4 w-4" />
            提供中リスト
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <ClipboardList className="mr-2 h-4 w-4" />
            下書き
          </TabsTrigger>
        </TabsList>

        <TabsContent value="on-tap" className="space-y-4 animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displaySlots.map((beer, index) => (
              <BeerSlotCard
                key={index}
                beer={beer}
                slotIndex={index}
                onToggleAvailability={() => handleToggleAvailability(index)}
                onToggleNew={() => handleToggleNew(index)}
                onEdit={() => handleEdit(index)}
                onReplace={() => handleReplace(index)}
                onLoadFromDraft={() => handleOpenDraftDialog(index)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="animate-in fade-in-50 duration-300">
          <DraftListManager />
        </TabsContent>
      </Tabs>

      <BeerForm
        beer={currentBeer}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <DraftSelectionDialog
        isOpen={draftDialogTarget !== null}
        onClose={handleCloseDraftDialog}
        targetSlotIndex={draftDialogTarget}
        onSuccess={handleDraftSuccess}
      />
    </div>
  );
}

