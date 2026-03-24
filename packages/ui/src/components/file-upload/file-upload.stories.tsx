import type { Meta, StoryObj } from "@storybook/nextjs"
import { FileUpload } from "./index.js"

const meta: Meta<typeof FileUpload> = {
  title: "Components/File Upload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleFile: Story = {
  args: {
    maxFiles: 1,
    multiple: false,
  },
}

export const CustomAccept: Story = {
  args: {
    accept: "application/pdf",
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
  },
}

export const SmallMaxSize: Story = {
  args: {
    maxSize: 512 * 1024,
    maxFiles: 2,
  },
}
