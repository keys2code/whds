import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "."
import { Button } from "../button"
import { UserIcon, StarIcon, BellIcon } from "@phosphor-icons/react/dist/ssr"

const meta: Meta<typeof Item> = {
  title: "Components/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemContent>
        <ItemTitle>Item title</ItemTitle>
        <ItemDescription>A short description of this item.</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

export const Outline: Story = {
  render: (args) => (
    <Item variant="outline" {...args}>
      <ItemContent>
        <ItemTitle>Outline item</ItemTitle>
        <ItemDescription>Has a visible border.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  argTypes: { variant: { control: false } },
}

export const Muted: Story = {
  render: (args) => (
    <Item variant="muted" {...args}>
      <ItemContent>
        <ItemTitle>Muted item</ItemTitle>
        <ItemDescription>Subtle background fill.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  argTypes: { variant: { control: false } },
}

export const Small: Story = {
  render: (args) => (
    <Item size="sm" {...args}>
      <ItemContent>
        <ItemTitle>Small item</ItemTitle>
        <ItemDescription>Compact spacing.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  argTypes: { size: { control: false } },
}

export const WithIconMedia: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <UserIcon aria-hidden="true" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Jane Doe</ItemTitle>
        <ItemDescription>jane@example.com</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

export const WithActions: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <BellIcon aria-hidden="true" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Manage your alerts.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-xs">
          <StarIcon aria-hidden="true" />
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const Group: Story = {
  render: () => (
    <ItemGroup>
      {["Inbox", "Drafts", "Sent"].map((label) => (
        <Item key={label} variant="muted">
          <ItemContent>
            <ItemTitle>{label}</ItemTitle>
          </ItemContent>
        </Item>
      ))}
      <ItemSeparator />
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Archive</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
