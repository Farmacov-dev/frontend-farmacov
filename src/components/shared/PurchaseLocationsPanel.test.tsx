// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PurchaseLocationsPanel from "./PurchaseLocationsPanel";

describe("PurchaseLocationsPanel", () => {
  it("renders the title and locations", () => {
    render(
      <PurchaseLocationsPanel
        title="Purchase places"
        locations={[
          {
            title: "Store A",
            subtitle: "Open daily",
            address: "Main street",
          },
          {
            title: "Store B",
          },
        ]}
      />
    );

    expect(screen.getByText("Purchase places")).toBeTruthy();
    expect(screen.getByText("Store A")).toBeTruthy();
    expect(screen.getByText("Open daily")).toBeTruthy();
    expect(screen.getByText("Main street")).toBeTruthy();
    expect(screen.getByText("Store B")).toBeTruthy();
  });
});
