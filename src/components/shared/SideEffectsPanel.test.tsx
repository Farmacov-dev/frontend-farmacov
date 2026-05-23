// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SideEffectsPanel from "./SideEffectsPanel";

describe("SideEffectsPanel", () => {
  it("renders the title and the side effect badges", () => {
    render(
      <SideEffectsPanel
        title="Side effects"
        effects={[
          { label: "Mild headache", severity: "low" },
          { label: "Nausea", severity: "medium" },
          { label: "Chest pain", severity: "high" },
        ]}
      />
    );

    expect(screen.getByText("Side effects")).toBeTruthy();
    expect(screen.getByText("Mild headache")).toBeTruthy();
    expect(screen.getByText("Nausea")).toBeTruthy();
    expect(screen.getByText("Chest pain")).toBeTruthy();
  });
});
