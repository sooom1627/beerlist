"use client";

import { useState } from "react";
import { BeerSlotCard } from "@/features/beerlist/components/beer-slot-card";
import { BeerForm } from "@/features/beerlist/components/beer-form";
import type { BeerFormData } from "@/features/beerlist/types/beer-form.types";
import { useBeers, useUpsertBeer } from "@/features/beerlist/hooks/useBeers";
import type { Beer } from "@/features/beerlist/types/beers.types";
import { uploadBeerImage } from "@/features/beerlist/api/beers.api";

const MAX_SLOTS = 8;

export default function AdminPage() {
  const { data: beerSlots, isLoading } = useBeers();
  const upsertBeerMutation = useUpsertBeer();

  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<'update' | 'replace'>('update');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displaySlots: (Beer | null)[] = beerSlots || Array(MAX_SLOTS).fill(null);

  const handleToggleAvailability = async (slotIndex: number) => {
    const beer = displaySlots[slotIndex];
    if (beer) {
      // Remove createdAt as it's not expected in the update payload
      const { createdAt, ...beerData } = beer;
      await upsertBeerMutation.mutateAsync({
        ...beerData,
        isAvailable: !beer.isAvailable,
      });
    }
  };

  const handleEdit = (slotIndex: number) => {
    setEditingSlotIndex(slotIndex);
    setEditMode('update');
    setIsFormOpen(true);
  };

  const handleReplace = (slotIndex: number) => {
    setEditingSlotIndex(slotIndex);
    setEditMode('replace');
    setIsFormOpen(true);
  };

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

  const handleCloseForm = () => {
    if (!isSubmitting) {
      setEditingSlotIndex(null);
      setIsFormOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-2">ビールリスト管理</h1>
        <p className="text-sm text-muted-foreground">
          最大8つのビールスロットを管理できます。各スロットにビールを追加・編集・削除できます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displaySlots.map((beer, index) => (
          <BeerSlotCard
            key={index}
            beer={beer}
            slotIndex={index}
            onToggleAvailability={() => handleToggleAvailability(index)}
            onEdit={() => handleEdit(index)}
            onReplace={() => handleReplace(index)}
          />
        ))}
      </div>

      <BeerForm
        beer={editMode === 'update' && editingSlotIndex !== null ? displaySlots[editingSlotIndex] : null}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
