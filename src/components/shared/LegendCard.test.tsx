// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LegendCard from "./LegendCard";

describe("LegendCard", () => {
  it("renders the title, items and action", () => {
    render(
      <LegendCard
        title="Status legend"
        items={[
          { label: "Completed", color: "#00ff00" },
          { label: "Pending", color: "#ff0000" },
        ]}
        action={<button type="button">Manage</button>}
      />
    );

    expect(screen.getByText("Status legend")).toBeTruthy();
    expect(screen.getByText("Completed")).toBeTruthy();
    expect(screen.getByText("Pending")).toBeTruthy();
    expect(screen.getByText("Manage")).toBeTruthy();
  });
});
