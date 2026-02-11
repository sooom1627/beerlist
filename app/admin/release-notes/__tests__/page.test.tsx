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

  it("最新バージョンv1.5.1が表示されること", () => {
    render(<ReleaseNotesPage />);
    const versionBadge = screen.getByText("v1.5.1");
    expect(versionBadge).toBeInTheDocument();
  });

  it("v1.5.1の変更内容が表示されること", () => {
    render(<ReleaseNotesPage />);
    const description = screen.getByText(
      "テキストカラーの改善：テキストカラーをより明確にしました。"
    );
    expect(description).toBeInTheDocument();
  });
});

