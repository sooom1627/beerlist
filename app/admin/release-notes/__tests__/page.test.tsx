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

  it("最新バージョンv1.4.2が表示されること", () => {
    render(<ReleaseNotesPage />);
    const versionBadge = screen.getByText("v1.4.2");
    expect(versionBadge).toBeInTheDocument();
  });

  it("v1.4.2の変更内容が表示されること", () => {
    render(<ReleaseNotesPage />);
    const description = screen.getByText(
      "ダイアログコンポーネントの改善：レイアウトとレスポンシブ対応を向上させました。"
    );
    expect(description).toBeInTheDocument();
  });
});

