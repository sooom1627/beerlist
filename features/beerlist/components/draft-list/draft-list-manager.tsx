import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { DraftBeerCard } from "./draft-beer-card";
import { BeerForm } from "../beer-form";
import {
  useDrafts,
  useCreateDraft,
  useUpdateDraft,
  useDeleteDraft,
} from "../../hooks/useDraftBeers";
import type { DraftBeer, Beer } from "../../types/beers.types";
import type { BeerFormData } from "../../types/beer-form.types";
import { uploadBeerImage } from "../../api/beers.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function DraftListManager() {
  const { data: drafts, isLoading } = useDrafts();
  const createDraftMutation = useCreateDraft();
  const updateDraftMutation = useUpdateDraft();
  const deleteDraftMutation = useDeleteDraft();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDraft, setEditingDraft] = useState<DraftBeer | null>(null);

  const handleCreate = () => {
    setEditingDraft(null);
    setIsFormOpen(true);
  };

  const handleEdit = (draft: DraftBeer) => {
    setEditingDraft(draft);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDraftMutation.mutateAsync(id);
      toast.success("下書きを削除しました");
    } catch (error) {
      console.error("Failed to delete draft:", error);
      toast.error("下書きの削除に失敗しました");
    }
  };

  const handleFormSubmit = async (data: BeerFormData) => {
    try {
      let imageUrl = data.image ?? "";
      if (data.imageFile) {
        imageUrl = await uploadBeerImage(data.imageFile);
      }

      const draftData = {
        image: imageUrl,
        brewery: data.brewery,
        name: data.name,
        style: data.style,
        location: data.location,
        description: data.description,
        price: data.price,
        alcohol: data.alcohol,
      };

      if (editingDraft) {
        await updateDraftMutation.mutateAsync({
          id: editingDraft.id,
          ...draftData,
        });
        toast.success("下書きを更新しました");
      } else {
        await createDraftMutation.mutateAsync(draftData);
        toast.success("下書きを作成しました");
      }
      setIsFormOpen(false);
      setEditingDraft(null);
    } catch (error) {
      console.error("Failed to save draft:", error);
      toast.error("下書きの保存に失敗しました");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDraft(null);
  };

  // Adapter to convert DraftBeer to Beer for BeerForm
  const beerForForm: Beer | null = editingDraft
    ? {
        ...editingDraft,
        tapNumber: 0, // Dummy value
        isAvailable: true, // Dummy value
        isNew: false, // Dummy value
      }
    : null;

  const AddDraftCard = () => (
    <Card
      className="border-dashed border-2 opacity-60 hover:opacity-100 transition-all duration-200 w-full cursor-pointer group flex flex-row items-center justify-start bg-muted/10 hover:bg-muted/30"
      onClick={handleCreate}
    >
      <CardContent className="flex flex-row items-center p-6 space-x-4 w-full md:w-auto lg:w-5xl">
        <div className="p-3 rounded-full bg-background border-2 border-muted group-hover:border-primary/50 transition-colors shadow-sm">
          <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </div>
        <div className="text-left space-y-0.5">
          <CardTitle className="text-base font-semibold text-muted-foreground group-hover:text-primary transition-colors">
            新しい下書きを追加
          </CardTitle>
          <CardDescription className="text-xs">
            タップに繋ぐ予定のビールを追加します。
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 w-full">
      <AddDraftCard />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-muted/20 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drafts?.map((draft) => (
            <DraftBeerCard
              key={draft.id}
              draft={draft}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <BeerForm
        beer={beerForForm}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
