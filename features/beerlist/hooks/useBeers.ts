import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBeers, upsertBeer, deleteBeer } from "../api/beers.api";
import { Beer } from "../types/beers.types";

export const beerKeys = {
  all: ["beers"] as const,
};

export const useBeers = () => {
  return useQuery({
    queryKey: beerKeys.all,
    queryFn: async () => {
      const beers = await getBeers();
      // Transform to 8 slots
      const slots: (Beer | null)[] = Array(8).fill(null);
      beers.forEach((beer) => {
        if (beer.tapNumber >= 1 && beer.tapNumber <= 8) {
          slots[beer.tapNumber - 1] = beer;
        }
      });
      return slots;
    },
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpsertBeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertBeer,
    onMutate: async (newBeer) => {
      // Cancel outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: beerKeys.all });

      // Snapshot the previous value
      const previousBeers = queryClient.getQueryData<(Beer | null)[]>(beerKeys.all);

      // Optimistically update to the new value
      if (previousBeers) {
        queryClient.setQueryData<(Beer | null)[]>(beerKeys.all, (old) => {
          if (!old) return Array(8).fill(null);
          const newSlots = [...old];
          
          if (newBeer.tapNumber) {
            const index = newBeer.tapNumber - 1;
            const existing = newSlots[index];
            
            // Construct optimistic beer object
            // Use existing values for fields that might be missing in partial update if any
            // (Though currently upsertBeer takes most fields except id/createdAt)
            const optimisticBeer: Beer = {
              id: newBeer.id ?? existing?.id ?? Date.now(), // Temporary ID if new
              createdAt: existing?.createdAt ?? new Date().toISOString(),
              tapNumber: newBeer.tapNumber,
              image: newBeer.image,
              brewery: newBeer.brewery,
              name: newBeer.name,
              style: newBeer.style,
              location: newBeer.location,
              description: newBeer.description,
              price: newBeer.price,
              alcohol: newBeer.alcohol,
              isAvailable: newBeer.isAvailable,
              isNew: newBeer.isNew,
            };
            
            newSlots[index] = optimisticBeer;
          }
          return newSlots;
        });
      }

      // Return a context object with the snapshotted value
      return { previousBeers };
    },
    onError: (err, newBeer, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousBeers) {
        queryClient.setQueryData(beerKeys.all, context.previousBeers);
      }
    },
    // onSettled removed to prevent race condition with Realtime subscription
    // The Realtime subscription in beerList.tsx will handle cache invalidation
  });
};

export const useDeleteBeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBeer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: beerKeys.all });
    },
  });
};
