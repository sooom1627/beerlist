import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminLayout from "../layout";
import "@testing-library/jest-dom";

// 依存コンポーネントをモック化
vi.mock("@/components/auth-button", () => ({
  AuthButton: () => <div data-testid="auth-button">AuthButton</div>,
}));

// ResizeObserverのモック
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("AdminLayout Header", () => {
  it("常にハンバーガーメニューが表示されること", () => {
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    // ハンバーガーメニューのトリガーボタン（"メニューを開く"）が存在することを確認
    const menuButton = screen.getByRole("button", { name: /メニューを開く/i });
    expect(menuButton).toBeInTheDocument();
  });
});

