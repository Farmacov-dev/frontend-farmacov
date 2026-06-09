import type { Meta, StoryObj } from "@storybook/react";
import PurchaseLocationsPanel from "./PurchaseLocationsPanel";

const meta: Meta<typeof PurchaseLocationsPanel> = {
  title: "Shared/PurchaseLocationsPanel",
  component: PurchaseLocationsPanel,
};

export default meta;
type Story = StoryObj<typeof PurchaseLocationsPanel>;

export const Default: Story = {
  args: {
    title: "Dónde comprar",
    locations: [
      {
        title: "Farmacia Central",
        subtitle: "Abierto todos los días",
        address: "Av. Principal 123",
      },
      {
        title: "Sucursal Norte",
        subtitle: "Entrega el mismo día",
        address: "Calle Norte 45",
      },
      {
        title: "Tienda Express",
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    title: "Opciones disponibles",
    locations: [
      {
        title: "Farmacia de guardia",
      },
    ],
  },
};
