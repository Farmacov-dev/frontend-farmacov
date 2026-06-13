// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MedicalSpecsSection from "./MedicalSpecsSection";

describe("MedicalSpecsSection", () => {
  it("renders the title and items", () => {
    render(
      <MedicalSpecsSection
        title="Medical specs"
        items={[
          { label: "Dose", value: "10 mg" },
          { label: "Interval", value: "Once a day" },
        ]}
      />
    );

    expect(screen.getByText("Medical specs")).toBeTruthy();
    expect(screen.getByText("Dose")).toBeTruthy();
    expect(screen.getByText("10 mg")).toBeTruthy();
    expect(screen.getByText("Interval")).toBeTruthy();
    expect(screen.getByText("Once a day")).toBeTruthy();
  });
});
