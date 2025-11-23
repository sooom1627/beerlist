"use client";

import { useState } from "react";
import { BeerSlotCard } from "@/features/beerlist/components/beer-slot-card";
import { BeerForm } from "@/features/beerlist/components/beer-form";
import type { Beer } from "@/features/beerlist/types/beers.types";
import type { BeerFormData } from "@/features/beerlist/types/beer-form.types";
import { beerList as initialBeerList } from "@/features/beerlist/screen/beerList";

const MAX_SLOTS = 8;

export default function AdminBeersPage() {
  const [beerSlots, setBeerSlots] = useState<(Beer | null)[]>(() => {
    const slots: (Beer | null)[] = Array(MAX_SLOTS).fill(null);
    initialBeerList.forEach((beer, index) => {
      if (index < MAX_SLOTS) {
        slots[index] = beer;
      }
    });
    return slots;
  });

  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleAvailability = (slotIndex: number) => {
    setBeerSlots((prev) => {
      const newSlots = [...prev];
      if (newSlots[slotIndex]) {
        newSlots[slotIndex] = {
          ...newSlots[slotIndex]!,
          isAvailable: !newSlots[slotIndex]!.isAvailable,
        };
      }
      return newSlots;
    });
  };

  const handleEdit = (slotIndex: number) => {
    setEditingSlotIndex(slotIndex);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: BeerFormData) => {
    if (editingSlotIndex !== null) {
      setBeerSlots((prev) => {
        const newSlots = [...prev];
        const beerData: Beer = {
          id: data.id ?? Date.now(),
          image: data.image,
          brewery: data.brewery,
          name: data.name,
          style: data.style,
          location: data.location,
          description: data.description,
          price: {
            glass: data.price.glass,
            pint: data.price.pint,
          },
          alcohol: data.alcohol,
          isAvailable: data.isAvailable,
          createdAt: data.createdAt,
        };
        newSlots[editingSlotIndex] = beerData;
        return newSlots;
      });
    }
    setEditingSlotIndex(null);
    setIsFormOpen(false);
  };

  const handleCloseForm = () => {
    setEditingSlotIndex(null);
    setIsFormOpen(false);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-2">ビールリスト管理</h1>
        <p className="text-sm text-muted-foreground">
          最大8つのビールスロットを管理できます。各スロットにビールを追加・編集・削除できます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {beerSlots.map((beer, index) => (
          <BeerSlotCard
            key={index}
            beer={beer}
            slotIndex={index}
            onToggleAvailability={() => handleToggleAvailability(index)}
            onEdit={() => handleEdit(index)}
          />
        ))}
      </div>

      <BeerForm
        beer={editingSlotIndex !== null ? beerSlots[editingSlotIndex] : null}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

