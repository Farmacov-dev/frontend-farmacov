// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  it("renders the title and filter selects", () => {
    render(
      <FilterBar
        title="Analysis filters"
        filters={[
          {
            key: "vaccine",
            label: "Vaccine",
            options: [
              { label: "All", value: "all" },
              { label: "COVID", value: "covid" },
            ],
          },
          {
            key: "sex",
            label: "Sex",
            options: [
              { label: "All", value: "all" },
              { label: "Female", value: "female" },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("Analysis filters")).toBeTruthy();
    expect(screen.getAllByRole("combobox").length).toBe(2);
  });

  it("calls onFilterChange when a select changes", () => {
    const onFilterChange = vi.fn();

    render(
      <FilterBar
        title="Analysis filters"
        filters={[
          {
            key: "vaccine",
            label: "Vaccine",
            options: [
              { label: "All", value: "all" },
              { label: "COVID", value: "covid" },
            ],
          },
          {
            key: "sex",
            label: "Sex",
            options: [
              { label: "All", value: "all" },
              { label: "Female", value: "female" },
            ],
          },
        ]}
        onFilterChange={onFilterChange}
      />
    );

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "covid" } });

    expect(onFilterChange).toHaveBeenCalledWith("vaccine", "covid");
  });
});
