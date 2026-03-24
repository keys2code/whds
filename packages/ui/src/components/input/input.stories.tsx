import type { Meta, StoryObj } from "@storybook/nextjs"
import { Input } from "."

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your email…",
    type: "email",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    defaultValue: "not-an-email",
    "aria-invalid": true,
  },
}
