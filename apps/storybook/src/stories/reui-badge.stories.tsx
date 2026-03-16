import type { Meta, StoryObj } from "@storybook/nextjs"
import { Badge } from "@keys2design/whds-ui/components/reui/badge"
import { Button } from "@keys2design/whds-ui/components/button"
import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

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
type BadgeSize = "sm" | "default" | "lg"

const variants = [
  "default",
  "outline",
  "secondary",
  "info",
  "success",
  "warning",
  "destructive",
  "warning-light",
  "success-light",
  "info-light",
  "destructive-light",
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

const sizes: BadgeSize[] = ["sm", "default", "lg"]

export const SizeShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {sizes.map((size) => (
        <Badge key={`normal-${size}`} size={size} variant="outline">
          Size {size}
        </Badge>
      ))}
    </div>
  ),
}

export const WithLeftIcon: Story = {
  render: () => (
    <Badge variant="outline" className="gap-0.75">
      <CheckIcon aria-hidden="true" className="size-2.5" />
      Verified
    </Badge>
  ),
}

export const WithDismissButton: Story = {
  render: () => (
    <Badge
      variant="outline"
      className="gap-0.75"
    >
      Updates
      <Button
        variant="ghost"
        size="icon"
        className="size-2.5 hover:bg-transparent"
      >
        <XIcon />
      </Button>
    </Badge>
  ),
}

export const WithStatusDot: Story = {
  render: () => (
    <Badge variant="info-light" className="gap-0.75">
      <span className="ms-0.25 size-1.25 rounded-full! bg-[currentColor]" />{" "}
      Live
    </Badge>
  ),
}

export const FullRadius: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size, index) => (
          <Badge key={`number-round-${size}`} size={size} variant="outline" className="rounded-full!">
            {index + 1}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <Badge key={`text-round-${size}`} size={size} variant="outline" className="rounded-full">
            Size {size}
          </Badge>
        ))}
      </div>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Badge
      variant="outline"
      render={
        <a href="https://reui.io/patterns/badge" target="_blank" rel="noreferrer">
          Badge docs
        </a>
      }
    />
  ),
}
