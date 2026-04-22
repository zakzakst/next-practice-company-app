// TODO: 調べて修正。storybookで「__dirname not defined」エラー（orval導入時にaxios利用したのが影響？）
import { Navbar } from "@/components/common/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { authMeHandler } from "@/lib/msw/handlers/auth";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Common/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    msw: {
      handlers: [authMeHandler],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
