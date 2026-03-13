import type { Meta, StoryObj } from "@storybook/nextjs"
import { Badge } from "@workspace/ui/components/reui/badge"

const meta = {
  title: "Components/ReUI Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

const variants = [
  "default",
  "outline",
  "secondary",
  "info",
  "success",
  "warning",
  "destructive",
  "primary",
  "primary-outline",
  "warning-outline",
  "success-outline",
  "info-outline",
  "destructive-outline",
] as const

export const VariantShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
}
