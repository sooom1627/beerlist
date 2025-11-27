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
});

