import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminLayout from "../layout";
import "@testing-library/jest-dom";

// 依存コンポーネントをモック化
vi.mock("@/components/auth-button", () => ({
  AuthButton: () => <div data-testid="auth-button">AuthButton</div>,
}));

vi.mock("@/components/theme-switcher", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

describe("AdminLayout", () => {
  it("フッターに利用規約へのリンクが存在すること", () => {
    render(
      <AdminLayout>
        <div>Child Content</div>
      </AdminLayout>
    );
    const termsLink = screen.getByRole("link", { name: /利用規約/i });
    expect(termsLink).toHaveAttribute("href", "/admin/terms");
  });

  it("フッターにリリースノートへのリンクが存在すること", () => {
    render(
      <AdminLayout>
        <div>Child Content</div>
      </AdminLayout>
    );
    const releaseNotesLink = screen.getByRole("link", { name: /リリースノート/i });
    expect(releaseNotesLink).toHaveAttribute("href", "/admin/release-notes");
  });

  it("フッターにバージョン情報が表示されていること", () => {
    render(
      <AdminLayout>
        <div>Child Content</div>
      </AdminLayout>
    );
    // "v" で始まるテキストを探すか、具体的なバージョンを指定するか
    // ここでは "v1.4.1" を期待値とする
    expect(screen.getByText("v1.4.2")).toBeInTheDocument();
  });
});

