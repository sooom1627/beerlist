import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TermsPage from "../page";
import "@testing-library/jest-dom";

describe("TermsPage", () => {
  it("タイトル「利用規約」が表示されること", () => {
    render(<TermsPage />);
    const heading = screen.getByRole("heading", { name: "利用規約" });
    expect(heading).toBeInTheDocument();
  });
});

