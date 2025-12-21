import { describe, it, expect, vi } from 'vitest';
import { getDefaultBeerFormValues } from '../useBeerFormData';
import type { Beer } from '../../types/beers.types';

describe('useBeerFormData', () => {
  describe('getDefaultBeerFormValues', () => {
    it('ビールデータからフォームの初期値を生成する', () => {
      const beer: Beer = {
        id: '1',
        tapNumber: 1,
        image: 'https://example.com/beer.jpg',
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
      };

      const result = getDefaultBeerFormValues(beer);

      expect(result).toEqual({
        id: '1',
        image: 'https://example.com/beer.jpg',
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
      });
    });

    it('ビールがnullの場合は空の初期値を返す', () => {
      const result = getDefaultBeerFormValues(null);

      expect(result).toEqual({
        image: '',
        brewery: '',
        name: '',
        style: '',
        color: '',
        location: '',
        description: '',
        price: { glass: 0, pint: 0 },
        alcohol: 0,
        isAvailable: true,
        createdAt: '',
        isNew: false,
      });
    });

    it('価格が正しくコピーされる', () => {
      const beer: Beer = {
        id: '1',
        tapNumber: 1,
        image: '',
        brewery: 'Test',
        name: 'Test',
        style: 'IPA',
        color: undefined,
        location: 'Tokyo',
        description: '',
        price: { glass: 1000, pint: 1500 },
        alcohol: 5.0,
        isAvailable: true,
        createdAt: '2024-01-01',
        isNew: false,
      };

      const result = getDefaultBeerFormValues(beer);

      expect(result.price).toEqual({ glass: 1000, pint: 1500 });
      // オブジェクトが新しいインスタンスであることを確認
      expect(result.price).not.toBe(beer.price);
    });

    it('isAvailableとisNewのフラグが正しくコピーされる', () => {
      const beer: Beer = {
        id: '1',
        tapNumber: 1,
        image: '',
        brewery: 'Test',
        name: 'Test',
        style: 'IPA',
        color: undefined,
        location: 'Tokyo',
        description: '',
        price: { glass: 800, pint: 1200 },
        alcohol: 5.0,
        isAvailable: false,
        createdAt: '2024-01-01',
        isNew: true,
      };

      const result = getDefaultBeerFormValues(beer);

      expect(result.isAvailable).toBe(false);
      expect(result.isNew).toBe(true);
    });
  });
});
