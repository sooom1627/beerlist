import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ReleaseNotesPage from "../page";
import "@testing-library/jest-dom";

describe("ReleaseNotesPage", () => {
  it("タイトル「リリースノート」が表示されること", () => {
    render(<ReleaseNotesPage />);
    const heading = screen.getByRole("heading", { name: "リリースノート" });
    expect(heading).toBeInTheDocument();
  });

  it("最新バージョンv1.5.0が表示されること", () => {
    render(<ReleaseNotesPage />);
    const versionBadge = screen.getByText("v1.5.0");
    expect(versionBadge).toBeInTheDocument();
  });

  it("v1.5.0の変更内容が表示されること", () => {
    render(<ReleaseNotesPage />);
    const description = screen.getByText(
      "ビールカラー機能の追加：各ビールに色を設定できるカラーピッカーを管理画面に追加しました。公開画面ではビールグラスアイコンで色を表示します。"
    );
    expect(description).toBeInTheDocument();
  });
});

