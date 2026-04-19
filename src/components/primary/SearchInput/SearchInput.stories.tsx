// src/components/primary/SearchInput/SearchInput.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchInput from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Primitivos/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Buscar vacuna...",
    onChange: () => {},
  },
};

export const ConTexto: Story = {
  args: {
    value: "Comirnaty",
    placeholder: "Buscar vacuna...",
    onChange: () => {},
  },
};

export const Interactivo: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    return (
      <div className="flex flex-col gap-3">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar vacuna..."
        />
        <span className="font-inter text-[14px] text-muted">
          Valor actual: "{query}"
        </span>
      </div>
    );
  },
};