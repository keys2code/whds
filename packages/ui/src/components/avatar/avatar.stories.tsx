import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "."

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const AVATAR_SRC = "https://github.com/shadcn.png"

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={AVATAR_SRC} alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Small: Story = {
  render: (args) => (
    <Avatar size="sm" {...args}>
      <AvatarImage src={AVATAR_SRC} alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
  argTypes: { size: { control: false } },
}

export const Large: Story = {
  render: (args) => (
    <Avatar size="lg" {...args}>
      <AvatarImage src={AVATAR_SRC} alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
  argTypes: { size: { control: false } },
}

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={AVATAR_SRC} alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {[
        { src: AVATAR_SRC, fallback: "SC" },
        { src: "/broken.jpg", fallback: "JD" },
        { src: "/broken.jpg", fallback: "AB" },
      ].map(({ src, fallback }) => (
        <Avatar key={fallback}>
          <AvatarImage src={src} alt={fallback} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
