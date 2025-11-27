import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDrafts, useCreateDraft, useUpdateDraft, useDeleteDraft, useApplyDraftToSlot } from '../useDraftBeers';
import * as draftsApi from '../../api/drafts.api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock API
vi.mock('../../api/drafts.api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDraftBeers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  describe('useDrafts', () => {
    it('should fetch drafts', async () => {
      const mockDrafts = [
        { id: 1, name: 'Draft 1', createdAt: '2023-01-01' } as any,
      ];
      vi.mocked(draftsApi.getDrafts).mockResolvedValue(mockDrafts);

      const { result } = renderHook(() => useDrafts(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockDrafts);
      expect(draftsApi.getDrafts).toHaveBeenCalled();
    });
  });

  describe('useCreateDraft', () => {
    it('should create draft and invalidate queries', async () => {
      const newDraft = { name: 'New Draft' } as any;
      vi.mocked(draftsApi.createDraft).mockResolvedValue({ id: 2, ...newDraft });

      const { result } = renderHook(() => useCreateDraft(), { wrapper });

      await result.current.mutateAsync(newDraft);

      expect(draftsApi.createDraft).toHaveBeenCalledWith(newDraft);
    });
  });

  describe('useUpdateDraft', () => {
    it('should update draft and invalidate queries', async () => {
      const updateData = { id: 1, name: 'Updated Draft' } as any;
      vi.mocked(draftsApi.updateDraft).mockResolvedValue(updateData);

      const { result } = renderHook(() => useUpdateDraft(), { wrapper });

      await result.current.mutateAsync(updateData);

      expect(draftsApi.updateDraft).toHaveBeenCalledWith(updateData);
    });
  });

  describe('useDeleteDraft', () => {
    it('should delete draft and invalidate queries', async () => {
      vi.mocked(draftsApi.deleteDraft).mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteDraft(), { wrapper });

      await result.current.mutateAsync(1);

      expect(draftsApi.deleteDraft).toHaveBeenCalledWith(1);
    });
  });

  describe('useApplyDraftToSlot', () => {
    it('should apply draft to slot, delete draft, and invalidate queries', async () => {
      const draft = { id: 1, name: 'Draft' } as any;
      const slotNumber = 1;
      vi.mocked(draftsApi.applyDraftToSlot).mockResolvedValue({} as any);
      vi.mocked(draftsApi.deleteDraft).mockResolvedValue(undefined);

      const { result } = renderHook(() => useApplyDraftToSlot(), { wrapper });

      await result.current.mutateAsync({ draft, slotNumber });

      expect(draftsApi.applyDraftToSlot).toHaveBeenCalledWith(draft, slotNumber);
      expect(draftsApi.deleteDraft).toHaveBeenCalledWith(draft.id);
    });
  });
});

