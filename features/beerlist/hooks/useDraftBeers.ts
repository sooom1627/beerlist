import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDrafts, createDraft, updateDraft, deleteDraft, applyDraftToSlot } from "../api/drafts.api";
import { beerKeys } from "./useBeers";

export const draftKeys = {
  all: ["drafts"] as const,
};

export const useDrafts = () => {
  return useQuery({
    queryKey: draftKeys.all,
    queryFn: getDrafts,
  });
};

export const useCreateDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (draft: Parameters<typeof createDraft>[0]) => createDraft(draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: draftKeys.all });
    },
  });
};

export const useUpdateDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (draft: Parameters<typeof updateDraft>[0]) => updateDraft(draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: draftKeys.all });
    },
  });
};

export const useDeleteDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDraft(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: draftKeys.all });
    },
  });
};

export const useApplyDraftToSlot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ draft, slotNumber }: { draft: any; slotNumber: number }) => {
      const result = await applyDraftToSlot(draft, slotNumber);
      await deleteDraft(draft.id);
      return result;
    },
    onSuccess: () => {
      // Invalidate both drafts (now needed as draft is deleted) and beers (needed to show update)
      queryClient.invalidateQueries({ queryKey: beerKeys.all });
      queryClient.invalidateQueries({ queryKey: draftKeys.all });
    },
  });
};

