import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useImageUpload } from '../useImageUpload';

describe('useImageUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('初期化', () => {
    it('初期画像なしで初期化される', () => {
      const { result } = renderHook(() => useImageUpload());

      expect(result.current.imagePreview).toBeNull();
      expect(result.current.imageFile).toBeNull();
    });

    it('初期画像ありで初期化される', () => {
      const initialImage = 'https://example.com/image.jpg';
      const { result } = renderHook(() => useImageUpload(initialImage));

      expect(result.current.imagePreview).toBe(initialImage);
      expect(result.current.imageFile).toBeNull();
    });
  });

  describe('handleFileChange', () => {
    it('有効な画像ファイルを処理する', () => {
      const { result } = renderHook(() => useImageUpload());

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const event = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let fileName: string | null = null;
      act(() => {
        fileName = result.current.handleFileChange(event);
      });

      expect(fileName).toBe('test.jpg');
      expect(result.current.imagePreview).toBe('mock-blob-url');
      expect(result.current.imageFile).toBe(file);
    });

    it('ファイルが選択されていない場合はnullを返す', () => {
      const { result } = renderHook(() => useImageUpload());

      const event = {
        target: {
          files: [],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let fileName: string | null = null;
      act(() => {
        fileName = result.current.handleFileChange(event);
      });

      expect(fileName).toBeNull();
      expect(result.current.imagePreview).toBeNull();
      expect(result.current.imageFile).toBeNull();
    });

    it('ファイルサイズが大きすぎる場合は拒否する', () => {
      const { result } = renderHook(() => useImageUpload());

      // 6MBのファイル（制限は5MB）
      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });
      const event = {
        target: {
          files: [largeFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let fileName: string | null = null;
      act(() => {
        fileName = result.current.handleFileChange(event);
      });

      expect(fileName).toBeNull();
      expect(global.alert).toHaveBeenCalledWith(
        '画像ファイルは5MB以下である必要があります'
      );
    });

    it('無効なファイル形式の場合は拒否する', () => {
      const { result } = renderHook(() => useImageUpload());

      const invalidFile = new File(['test'], 'test.pdf', {
        type: 'application/pdf',
      });
      const event = {
        target: {
          files: [invalidFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let fileName: string | null = null;
      act(() => {
        fileName = result.current.handleFileChange(event);
      });

      expect(fileName).toBeNull();
      expect(global.alert).toHaveBeenCalledWith(
        'JPEG、PNG、WebP形式の画像ファイルを選択してください'
      );
    });
  });

  describe('handleRemoveImage', () => {
    it('画像を削除する', () => {
      const { result } = renderHook(() => useImageUpload('initial-image.jpg'));

      act(() => {
        result.current.handleRemoveImage();
      });

      expect(result.current.imagePreview).toBeNull();
      expect(result.current.imageFile).toBeNull();
    });
  });

  describe('resetImage', () => {
    it('画像をリセットする', () => {
      const { result } = renderHook(() => useImageUpload());

      // まず画像を設定
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const event = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleFileChange(event);
      });

      expect(result.current.imageFile).toBe(file);

      // リセット
      act(() => {
        result.current.resetImage('new-image.jpg');
      });

      expect(result.current.imagePreview).toBe('new-image.jpg');
      expect(result.current.imageFile).toBeNull();
    });

    it('nullでリセットする', () => {
      const { result } = renderHook(() => useImageUpload('initial-image.jpg'));

      act(() => {
        result.current.resetImage(null);
      });

      expect(result.current.imagePreview).toBeNull();
      expect(result.current.imageFile).toBeNull();
    });
  });

  describe('クリーンアップ', () => {
    it('アンマウント時にBlob URLをクリーンアップする', () => {
      const { result, unmount } = renderHook(() => useImageUpload());

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const event = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleFileChange(event);
      });

      unmount();

      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-blob-url');
    });
  });
});
