import type { Meta, StoryObj } from "@storybook/nextjs"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "."
import { Button } from "../button"
import { InfoIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon aria-hidden="true" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        Your subscription renews on the 1st of next month.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <WarningIcon aria-hidden="true" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        Your session has expired. Please sign in again to continue.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the application is ready to install.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">Update</Button>
      </AlertAction>
    </Alert>
  ),
}
