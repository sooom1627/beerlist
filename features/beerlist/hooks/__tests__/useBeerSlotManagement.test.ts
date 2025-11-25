import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBeerSlotManagement } from '../useBeerSlotManagement';
import type { Beer } from '../../types/beers.types';

// React Queryのモック
vi.mock('../useBeers', () => ({
  useUpsertBeer: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
  }),
}));

// APIのモック
vi.mock('../../api/beers.api', () => ({
  uploadBeerImage: vi.fn().mockResolvedValue('https://example.com/uploaded.jpg'),
}));

describe('useBeerSlotManagement', () => {
  const mockBeerSlots: (Beer | null)[] = [
    {
      id: '1',
      tapNumber: 1,
      image: 'https://example.com/beer1.jpg',
      brewery: 'Test Brewery',
      name: 'Test Beer',
      style: 'IPA',
      location: 'Tokyo',
      description: 'Test description',
      price: { glass: 800, pint: 1200 },
      alcohol: 5.5,
      isAvailable: true,
      createdAt: '2024-01-01',
      isNew: false,
    },
    null,
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('初期状態', () => {
    it('初期状態が正しく設定される', () => {
      const { result } = renderHook(() => useBeerSlotManagement(mockBeerSlots));

      expect(result.current.editingSlotIndex).toBeNull();
      expect(result.current.isFormOpen).toBe(false);
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.currentBeer).toBeNull();
    });
  });

  describe('handleEdit', () => {
    it('編集モードでフォームを開く', () => {
      const { result } = renderHook(() => useBeerSlotManagement(mockBeerSlots));

      act(() => {
        result.current.handleEdit(0);
      });

      expect(result.current.editingSlotIndex).toBe(0);
      expect(result.current.isFormOpen).toBe(true);
      expect(result.current.currentBeer).toEqual(mockBeerSlots[0]);
    });
  });

  describe('handleReplace', () => {
    it('入れ替えモードでフォームを開く', () => {
      const { result } = renderHook(() => useBeerSlotManagement(mockBeerSlots));

      act(() => {
        result.current.handleReplace(0);
      });

      expect(result.current.editingSlotIndex).toBe(0);
      expect(result.current.isFormOpen).toBe(true);
      expect(result.current.currentBeer).toBeNull();
    });
  });

  describe('handleCloseForm', () => {
    it('フォームを閉じる', () => {
      const { result } = renderHook(() => useBeerSlotManagement(mockBeerSlots));

      act(() => {
        result.current.handleEdit(0);
      });

      expect(result.current.isFormOpen).toBe(true);

      act(() => {
        result.current.handleCloseForm();
      });

      expect(result.current.editingSlotIndex).toBeNull();
      expect(result.current.isFormOpen).toBe(false);
    });
  });

  describe('getCurrentBeer', () => {
    it('編集モードでは現在のビールを返す', () => {
      const { result } = renderHook(() => useBeerSlotManagement(mockBeerSlots));

      act(() => {
        result.current.handleEdit(0);
      });

      expect(result.current.currentBeer).toEqual(mockBeerSlots[0]);
    });

    it('入れ替えモードではnullを返す', () => {
      const { result } = renderHook(() => useBeerSlotManagement(mockBeerSlots));

      act(() => {
        result.current.handleReplace(0);
      });

      expect(result.current.currentBeer).toBeNull();
    });
  });
});
