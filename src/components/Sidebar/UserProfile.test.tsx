// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
  it("renders the user name, role and initials", () => {
    render(
      <UserProfile
        userName="Ana Lopez"
        userRole="Analyst"
        collapsed={false}
      />
    );

    expect(screen.getByText("Ana Lopez")).toBeTruthy();
    expect(screen.getByText("Analyst")).toBeTruthy();
    expect(screen.getByText("AL")).toBeTruthy();
  });

  it("hides text details when collapsed", () => {
    render(
      <UserProfile
        userName="Ana Lopez"
        userRole="Analyst"
        collapsed
      />
    );

    expect(screen.getByText("AL")).toBeTruthy();
    expect(screen.queryByText("Ana Lopez")).toBeNull();
    expect(screen.queryByText("Analyst")).toBeNull();
  });
});
