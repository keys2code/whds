import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "."
import { MagnifyingGlassIcon, AtIcon, LockIcon } from "@phosphor-icons/react/dist/ssr"

const meta: Meta<typeof InputGroup> = {
  title: "Components/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const InlineStart: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <AtIcon aria-hidden="true" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  ),
}

export const InlineEnd: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <MagnifyingGlassIcon aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const BothSides: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <LockIcon aria-hidden="true" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="password" placeholder="Password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <MagnifyingGlassIcon aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const BlockStart: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="block-start">Label</InputGroupAddon>
      <InputGroupInput placeholder="Enter value" />
    </InputGroup>
  ),
}

export const BlockEnd: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Enter value" />
      <InputGroupAddon align="block-end">Helper text</InputGroupAddon>
    </InputGroup>
  ),
}

export const WithTextarea: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="block-start">Message</InputGroupAddon>
      <InputGroupTextarea placeholder="Write something…" />
    </InputGroup>
  ),
}
