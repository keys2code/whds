import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pattern } from "./filter-example";

const meta = {
  title: "Reui/Filters",
  component: Pattern,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="min-w-[600px] max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
