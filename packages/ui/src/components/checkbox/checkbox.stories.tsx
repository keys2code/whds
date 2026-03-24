import type { Meta, StoryObj } from "@storybook/nextjs"
import { Checkbox } from "."
import { Label } from "../label"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="default" {...args} />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" defaultChecked {...args} />
      <Label htmlFor="checked">Subscribe to newsletter</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled {...args} />
      <Label htmlFor="disabled">Unavailable option</Label>
    </div>
  ),
}

export const DisabledChecked: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-checked" disabled defaultChecked {...args} />
      <Label htmlFor="disabled-checked">Locked setting</Label>
    </div>
  ),
}

export const Invalid: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="invalid" aria-invalid {...args} />
      <Label htmlFor="invalid">You must accept the terms</Label>
    </div>
  ),
}
