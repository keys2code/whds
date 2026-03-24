import type { Meta, StoryObj } from "@storybook/nextjs"
import { Textarea } from "."

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Write something…",
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
    defaultValue: "Invalid content",
    "aria-invalid": true,
  },
}

export const FixedRows: Story = {
  args: {
    rows: 6,
    placeholder: "Six rows tall…",
  },
}
