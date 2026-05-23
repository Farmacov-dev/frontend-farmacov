// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NotesForm from "./NotesFrom";

describe("NotesForm", () => {
  it("renders the current values", () => {
    render(
      <NotesForm
        values={{
          referenceChart: "Chart A",
          noteTitle: "Note title",
          observations: "Some notes",
        }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(3);
    expect((inputs[0] as HTMLInputElement).value).toBe("Chart A");
    expect((inputs[1] as HTMLInputElement).value).toBe("Note title");
    expect((inputs[2] as HTMLTextAreaElement).value).toBe("Some notes");
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("calls onChange and onSubmit", () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();

    render(
      <NotesForm
        values={{
          referenceChart: "",
          noteTitle: "",
          observations: "",
        }}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Chart B" } });
    fireEvent.change(inputs[1], { target: { value: "Title B" } });
    fireEvent.change(inputs[2], { target: { value: "Observations B" } });
    fireEvent.click(screen.getByRole("button"));

    expect(onChange).toHaveBeenCalledWith("referenceChart", "Chart B");
    expect(onChange).toHaveBeenCalledWith("noteTitle", "Title B");
    expect(onChange).toHaveBeenCalledWith("observations", "Observations B");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
