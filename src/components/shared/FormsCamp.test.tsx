// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormsCamp from "./FormsCamp";

describe("FormsCamp", () => {
  it("renders the label, required marker and helper text", () => {
    render(
      <FormsCamp label="Field" required helperText="Helpful text">
        <input type="text" />
      </FormsCamp>
    );

    expect(screen.getByText("Field")).toBeTruthy();
    expect(screen.getByText("*")).toBeTruthy();
    expect(screen.getByText("Helpful text")).toBeTruthy();
  });

  it("shows error text instead of helper text", () => {
    render(
      <FormsCamp label="Field" helperText="Helpful text" error="Invalid value">
        <input type="text" />
      </FormsCamp>
    );

    expect(screen.getByText("Invalid value")).toBeTruthy();
    expect(screen.queryByText("Helpful text")).toBeNull();
  });
});
