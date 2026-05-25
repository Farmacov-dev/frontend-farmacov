// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SideEffectBadge from "./SideEffectBadge";

describe("SideEffectBadge", () => {
  it("renders the label and low severity styles", () => {
    const { container } = render(
      <SideEffectBadge label="Headache" severity="low" />
    );

    expect(screen.getByText("Headache")).toBeTruthy();
    expect(container.firstElementChild?.className).toContain("bg-green-50");
    expect(container.firstElementChild?.className).toContain("text-green-700");
  });

  it("applies the high severity styles", () => {
    const { container } = render(
      <SideEffectBadge label="Chest pain" severity="high" />
    );

    expect(screen.getByText("Chest pain")).toBeTruthy();
    expect(container.firstElementChild?.className).toContain("bg-red-50");
    expect(container.firstElementChild?.className).toContain("text-red-700");
  });
});
