import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "."
import { Input } from "../input"

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
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
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: (args) => (
    <Field orientation="vertical" {...args}>
      <FieldLabel htmlFor="vertical-input">Full name</FieldLabel>
      <Input id="vertical-input" placeholder="Jane Doe" />
    </Field>
  ),
  argTypes: { orientation: { control: false } },
}

export const Horizontal: Story = {
  render: (args) => (
    <FieldGroup>
      <Field orientation="horizontal" {...args}>
        <FieldLabel htmlFor="horizontal-input">Full name</FieldLabel>
        <Input id="horizontal-input" placeholder="Jane Doe" />
      </Field>
    </FieldGroup>
  ),
  argTypes: { orientation: { control: false } },
}

export const WithDescription: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="with-desc">Email</FieldLabel>
      <Input id="with-desc" type="email" placeholder="you@example.com" />
      <FieldDescription>
        We&apos;ll never share your email with anyone.
      </FieldDescription>
    </Field>
  ),
}

export const WithError: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="with-error">Email</FieldLabel>
      <Input
        id="with-error"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
}

export const MultipleErrors: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="multi-error">Password</FieldLabel>
      <Input id="multi-error" type="password" defaultValue="pw" aria-invalid />
      <FieldError
        errors={[
          { message: "Must be at least 8 characters" },
          { message: "Must contain an uppercase letter" },
          { message: "Must contain a number" },
        ]}
      />
    </Field>
  ),
}
