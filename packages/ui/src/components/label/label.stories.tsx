import type { Meta, StoryObj } from "@storybook/nextjs"
import { Label } from "."

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Email address",
  },
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  render: (args) => (
    <Label {...args}>
      Email address <span aria-hidden="true" className="text-destructive">*</span>
    </Label>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div data-disabled="true">
      <Label {...args} />
    </div>
  ),
}
