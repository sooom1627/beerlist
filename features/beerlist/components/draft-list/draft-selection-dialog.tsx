import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DraftBeer } from "../../types/beers.types";
import { useDrafts, useApplyDraftToSlot } from "../../hooks/useDraftBeers";
import { DraftBeerCard } from "./draft-beer-card";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DraftSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  targetSlotIndex: number | null; // 0-based index
  onSuccess?: () => void;
}

export function DraftSelectionDialog({
  isOpen,
  onClose,
  targetSlotIndex,
  onSuccess,
}: DraftSelectionDialogProps) {
  const { data: drafts, isLoading } = useDrafts();
  const applyDraftMutation = useApplyDraftToSlot();
  const [selectedDraft, setSelectedDraft] = useState<DraftBeer | null>(null);

  const handleApplyClick = (draft: DraftBeer) => {
    setSelectedDraft(draft);
  };

  const handleConfirmApply = async () => {
    if (selectedDraft && targetSlotIndex !== null) {
      try {
        await applyDraftMutation.mutateAsync({
          draft: selectedDraft,
          slotNumber: targetSlotIndex + 1, // Convert 0-based index to 1-based tapNumber
        });
        onSuccess?.();
        onClose();
      } catch (error) {
        console.error("Failed to apply draft:", error);
      } finally {
        setSelectedDraft(null);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl w-11/12 max-h-[90vh] flex flex-col rounded-2xl">
          <DialogHeader>
            <DialogTitle>下書きからビールを選択</DialogTitle>
            <DialogDescription>
              TAP {targetSlotIndex !== null ? targetSlotIndex + 1 : ""} に反映するビールを選択してください。
              現在の内容は上書きされます。
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : drafts && drafts.length > 0 ? (
            <ScrollArea className="flex-1 -mx-4 px-4 min-h-0 overflow-y-scroll scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {drafts.map((draft) => (
                  <DraftBeerCard
                    key={draft.id}
                    draft={draft}
                    onEdit={() => {}} // No edit in selection mode
                    onDelete={() => {}} // No delete in selection mode
                    onApply={handleApplyClick}
                    isSelectionMode={true}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              下書きがありません。
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!selectedDraft} onOpenChange={(open) => !open && setSelectedDraft(null)}>
        <AlertDialogContent className="max-w-3xl w-11/12 max-h-[90vh] flex flex-col rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>反映確認</AlertDialogTitle>
            <AlertDialogDescription>
              TAP {targetSlotIndex !== null ? targetSlotIndex + 1 : ""} の内容を
              「{selectedDraft?.name}」で上書きしますか？
              <br />
              <span className="text-destructive text-sm mt-2 block">
                ※現在のTAP情報は失われます。
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmApply} disabled={applyDraftMutation.isPending}>
              {applyDraftMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              反映する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

