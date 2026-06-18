import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBeerSlotManagement, type ToastNotification } from '../useBeerSlotManagement';
import type { Beer } from '../../types/beers.types';

// モック用の変数
let mockMutateAsync: Mock;

// React Queryのモック
vi.mock('../useBeers', () => ({
  useUpsertBeer: () => ({
    mutateAsync: mockMutateAsync,
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
      isEventBeer: false,
    },
    null,
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockMutateAsync = vi.fn().mockResolvedValue({});
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

  // ============================================
  // Toast通知のテスト（TDD: 新規追加）
  // ============================================
  describe('Toast通知コールバック', () => {
    describe('handleToggleAvailability', () => {
      it('成功時にonNotifyが呼ばれる（在庫切れに変更）', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleAvailability(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'success',
          message: '在庫ステータスを更新しました',
        });
      });

      it('成功時にonNotifyが呼ばれる（在庫ありに変更）', async () => {
        const onNotify = vi.fn();
        const unavailableBeer = { ...mockBeerSlots[0]!, isAvailable: false };
        const slots = [unavailableBeer, null];
        
        const { result } = renderHook(() => 
          useBeerSlotManagement(slots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleAvailability(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'success',
          message: '在庫ステータスを更新しました',
        });
      });

      it('失敗時にonNotifyがエラーで呼ばれる', async () => {
        mockMutateAsync.mockRejectedValueOnce(new Error('API Error'));
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleAvailability(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'error',
          message: '在庫ステータスの更新に失敗しました',
        });
      });

      it('ビールが存在しないスロットでは何も起きない', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleAvailability(1); // null slot
        });

        expect(onNotify).not.toHaveBeenCalled();
        expect(mockMutateAsync).not.toHaveBeenCalled();
      });
    });

    describe('handleToggleNew', () => {
      it('成功時にonNotifyが呼ばれる', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleNew(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'success',
          message: '新着ステータスを更新しました',
        });
      });

      it('失敗時にonNotifyがエラーで呼ばれる', async () => {
        mockMutateAsync.mockRejectedValueOnce(new Error('API Error'));
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleNew(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'error',
          message: '新着ステータスの更新に失敗しました',
        });
      });
    });

    describe('handleToggleEventBeer', () => {
      it('成功時にonNotifyが呼ばれる', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() =>
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleEventBeer(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'success',
          message: 'イベントビールステータスを更新しました',
        });
      });

      it('失敗時にonNotifyがエラーで呼ばれる', async () => {
        mockMutateAsync.mockRejectedValueOnce(new Error('API Error'));
        const onNotify = vi.fn();
        const { result } = renderHook(() =>
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        await act(async () => {
          await result.current.handleToggleEventBeer(0);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'error',
          message: 'イベントビールステータスの更新に失敗しました',
        });
      });
    });

    describe('handleFormSubmit', () => {
      const mockFormData = {
        id: '1',
        image: 'https://example.com/beer1.jpg',
        brewery: 'Updated Brewery',
        name: 'Updated Beer',
        style: 'Stout',
        location: 'Osaka',
        description: 'Updated description',
        price: { glass: 900, pint: 1300 },
        alcohol: 6.0,
        isAvailable: true,
        isNew: true,
        isEventBeer: false,
      };

      it('更新成功時にonNotifyが呼ばれる', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        // フォームを開く
        act(() => {
          result.current.handleEdit(0);
        });

        // フォーム送信
        await act(async () => {
          await result.current.handleFormSubmit(mockFormData);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'success',
          message: 'ビール情報を保存しました',
        });
      });

      it('新規作成成功時にonNotifyが呼ばれる', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        // 入れ替えモードでフォームを開く
        act(() => {
          result.current.handleReplace(1);
        });

        const newBeerData = { ...mockFormData, id: undefined };

        await act(async () => {
          await result.current.handleFormSubmit(newBeerData);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'success',
          message: 'ビール情報を保存しました',
        });
      });

      it('失敗時にonNotifyがエラーで呼ばれる', async () => {
        mockMutateAsync.mockRejectedValueOnce(new Error('Save Error'));
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        act(() => {
          result.current.handleEdit(0);
        });

        await act(async () => {
          await result.current.handleFormSubmit(mockFormData);
        });

        expect(onNotify).toHaveBeenCalledWith({
          type: 'error',
          message: '保存に失敗しました',
        });
      });

      it('editingSlotIndexがnullの場合は何もしない', async () => {
        const onNotify = vi.fn();
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots, { onNotify })
        );

        // フォームを開かない状態で送信
        await act(async () => {
          await result.current.handleFormSubmit(mockFormData);
        });

        expect(onNotify).not.toHaveBeenCalled();
        expect(mockMutateAsync).not.toHaveBeenCalled();
      });
    });

    describe('onNotifyが未設定の場合', () => {
      it('onNotify未設定でもエラーにならない', async () => {
        const { result } = renderHook(() => 
          useBeerSlotManagement(mockBeerSlots)
        );

        // エラーなく実行できること
        await act(async () => {
          await result.current.handleToggleAvailability(0);
        });

        expect(mockMutateAsync).toHaveBeenCalled();
      });
    });
  });
});
