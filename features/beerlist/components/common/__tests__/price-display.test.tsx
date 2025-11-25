import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceDisplay } from '../price-display';

describe('PriceDisplay', () => {
  describe('compactバリアント', () => {
    it('グラスとパイントの価格を表示する', () => {
      render(
        <PriceDisplay glassPrice={800} pintPrice={1200} variant="compact" />
      );

      expect(screen.getByText('Glass')).toBeInTheDocument();
      expect(screen.getByText('¥800')).toBeInTheDocument();
      expect(screen.getByText('Pint')).toBeInTheDocument();
      expect(screen.getByText('¥1,200')).toBeInTheDocument();
    });

    it('価格を3桁区切りで表示する', () => {
      render(
        <PriceDisplay glassPrice={1000} pintPrice={1500} variant="compact" />
      );

      expect(screen.getByText('¥1,000')).toBeInTheDocument();
      expect(screen.getByText('¥1,500')).toBeInTheDocument();
    });
  });

  describe('detailedバリアント', () => {
    it('グラスとパイントの価格と容量を表示する', () => {
      render(
        <PriceDisplay glassPrice={800} pintPrice={1200} variant="detailed" />
      );

      expect(screen.getByText(/250ml/)).toBeInTheDocument();
      expect(screen.getByText(/470ml/)).toBeInTheDocument();
      expect(screen.getByText('¥800')).toBeInTheDocument();
      expect(screen.getByText('¥1,200')).toBeInTheDocument();
    });

    it('デフォルトでdetailedバリアントを使用する', () => {
      render(<PriceDisplay glassPrice={800} pintPrice={1200} />);

      // detailed バリアントの特徴である容量表示を確認
      expect(screen.getByText(/250ml/)).toBeInTheDocument();
      expect(screen.getByText(/470ml/)).toBeInTheDocument();
    });
  });

  describe('価格フォーマット', () => {
    it('0円を正しく表示する', () => {
      render(<PriceDisplay glassPrice={0} pintPrice={0} variant="compact" />);

      const prices = screen.getAllByText('¥0');
      expect(prices).toHaveLength(2);
    });

    it('大きな金額を3桁区切りで表示する', () => {
      render(
        <PriceDisplay
          glassPrice={10000}
          pintPrice={15000}
          variant="compact"
        />
      );

      expect(screen.getByText('¥10,000')).toBeInTheDocument();
      expect(screen.getByText('¥15,000')).toBeInTheDocument();
    });
  });
});
