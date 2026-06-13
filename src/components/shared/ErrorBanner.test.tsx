// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBanner from "./ErrorBanner";

describe("ErrorBanner", () => {
  it("renders the message and warning style", () => {
    const { container } = render(
      <ErrorBanner
        title="Validation failed"
        message="The form cannot be saved"
        type="warning"
      />
    );

    expect(screen.getByText("Validation failed")).toBeTruthy();
    expect(screen.getByText("The form cannot be saved")).toBeTruthy();
    expect(container.firstElementChild?.className).toContain("bg-yellow-50");
    expect(container.firstElementChild?.className).toContain("border-yellow-200");
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <ErrorBanner
        title="Validation failed"
        message="The form cannot be saved"
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
