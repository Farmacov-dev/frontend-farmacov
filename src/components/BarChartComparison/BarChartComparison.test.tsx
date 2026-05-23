// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BarChartComparison from "./BarChartComparison";

describe("BarChartComparison", () => {
  it("renders the empty state when there is no data", () => {
    render(<BarChartComparison />);

    expect(
      screen.getByText("No hay datos disponibles para mostrar")
    ).toBeTruthy();
    expect(screen.getByText("Artralgias")).toBeTruthy();
    expect(screen.getByText("Mialgias")).toBeTruthy();
  });

  it("renders the groups when data exists", () => {
    render(
      <BarChartComparison
        data={[
          { label: "Group 1", firstValue: 400, secondValue: 2200 },
          { label: "Group 2", firstValue: 6200, secondValue: 12000 },
        ]}
      />
    );

    expect(screen.getByText("Group 1")).toBeTruthy();
    expect(screen.getByText("Group 2")).toBeTruthy();
  });
});
