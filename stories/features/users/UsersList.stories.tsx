import { UsersList } from "@/components/features/users/UsersList";
import { usersMock } from "@/mocks/users";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Features/Users/UsersList",
  component: UsersList,
  tags: ["autodocs"],
  args: {
    onDeleteUser: fn(),
  },
} satisfies Meta<typeof UsersList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: usersMock,
  },
};

export const Empty: Story = {
  args: {
    users: [],
  },
};

export const Disabled: Story = {
  args: {
    users: usersMock,
    disabled: true,
  },
};
