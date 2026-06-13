// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LegendItem from "./LegendItem";

describe("LegendItem", () => {
  it("renders the label and color box", () => {
    const { container } = render(
      <LegendItem label="Approved" color="#123456" />
    );

    expect(screen.getByText("Approved")).toBeTruthy();

    const colorBox = container.firstElementChild?.firstElementChild as HTMLElement | null;
    expect(colorBox?.style.backgroundColor).not.toBe("");
  });

  it("applies the compact circle style", () => {
    const { container } = render(
      <LegendItem label="Pending" color="#ff0000" shape="circle" size="sm" />
    );

    const colorBox = container.firstElementChild?.firstElementChild as HTMLElement | null;
    expect(screen.getByText("Pending")).toBeTruthy();
    expect(colorBox?.className).toContain("rounded-full");
    expect(colorBox?.className).toContain("h-3");
    expect(colorBox?.className).toContain("w-3");
  });
});
