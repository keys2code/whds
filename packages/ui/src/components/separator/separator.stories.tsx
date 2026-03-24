import type { Meta, StoryObj } from "@storybook/nextjs"
import { Separator } from "."

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64 space-y-2">
      <p className="text-sm">Above</p>
      <Separator {...args} />
      <p className="text-sm">Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-8 items-center gap-2">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" {...args} />
      <span className="text-sm">Right</span>
    </div>
  ),
  argTypes: {
    orientation: { control: false },
  },
}
