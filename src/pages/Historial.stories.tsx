import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Historial from "./Historial";
import { queryClient } from "../config/queryClient";
import { SidebarProvider } from "../context/SidebarContext";

const meta = {
  title: "Pages/Historial",
  component: Historial,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <MemoryRouter initialEntries={["/historial"]}>
            <Story />
          </MemoryRouter>
        </SidebarProvider>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof Historial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

