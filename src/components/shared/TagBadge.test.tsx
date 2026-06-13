// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TagBadge from "./TagBadge";

describe("TagBadge", () => {
  it("renders the label with default styles", () => {
    const { container } = render(<TagBadge label="Active" />);

    expect(screen.getByText("Active")).toBeTruthy();
    expect(container.firstElementChild?.className).toContain("bg-blue-50");
    expect(container.firstElementChild?.className).toContain("text-xs");
  });

  it("supports custom tone, variant and size", () => {
    const { container } = render(
      <TagBadge label="Warning" tone="red" variant="solid" size="md" />
    );

    expect(screen.getByText("Warning")).toBeTruthy();
    expect(container.firstElementChild?.className).toContain("bg-red-500");
    expect(container.firstElementChild?.className).toContain("text-sm");
  });
});
