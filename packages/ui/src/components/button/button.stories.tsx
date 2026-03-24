import type { Meta, StoryObj } from "@storybook/nextjs"
import { ArrowRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "."

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
  },
  argTypes: {
    children: { control: "text" },
    className: { control: false },
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "destructive-outline", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl", "icon-xs", "icon-sm", "icon", "icon-lg", "icon-xl"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const Ghost: Story = {
  args: { variant: "ghost" },
}

export const Destructive: Story = {
  args: { variant: "destructive" },
}

export const DestructiveOutline: Story = {
  args: { variant: "destructive-outline" },
}

export const Link: Story = {
  args: { variant: "link" },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const WithLeftIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <DownloadSimpleIcon aria-hidden="true" data-icon="inline-start" />
      Download
    </Button>
  ),
}

export const WithRightIcon: Story = {
  render: (args) => (
    <Button {...args}>
      Continue
      <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
    </Button>
  ),
}
