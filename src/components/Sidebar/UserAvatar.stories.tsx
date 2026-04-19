import type { Meta, StoryObj } from "@storybook/react-vite";
import UserAvatar from "./UserAvatar";

const meta = {
  title: "Components/UserAvatar",
  component: UserAvatar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "16px",
          background: "#ECEFF3",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    userName: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaroRamirez: Story = {
  name: "Caro Ramírez",
  args: {
    userName: "Caro Ramirez",
  },
};

export const AlejandroFernandez: Story = {
  name: "Alejandro Fernández",
  args: {
    userName: "Alejandro Fernandez",
  },
};