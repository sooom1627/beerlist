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

  it("最新バージョンv1.4.3が表示されること", () => {
    render(<ReleaseNotesPage />);
    const versionBadge = screen.getByText("v1.4.3");
    expect(versionBadge).toBeInTheDocument();
  });

  it("v1.4.3の変更内容が表示されること", () => {
    render(<ReleaseNotesPage />);
    const description = screen.getByText(
      "セキュリティアップデート：Next.js 16.0.7、React 19.2.1、react-dom 19.2.1へのアップグレードにより、CVE-2025-55182の脆弱性を修正しました。"
    );
    expect(description).toBeInTheDocument();
  });
});

