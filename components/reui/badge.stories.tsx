import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { Badge } from "./badge";

const meta = {
  title: "Reui/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "info",
        "success",
        "warning",
        "destructive",
        "focus",
        "invert",
        "primary-light",
        "warning-light",
        "success-light",
        "info-light",
        "destructive-light",
        "invert-light",
        "focus-light",
        "primary-outline",
        "warning-outline",
        "success-outline",
        "info-outline",
        "destructive-outline",
        "invert-outline",
        "focus-outline",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};

export const PrimaryLight: Story = {
  args: { variant: "primary-light", children: "Primary Light" },
};

export const SuccessLight: Story = {
  args: { variant: "success-light", children: "Success Light" },
};

export const WarningLight: Story = {
  args: { variant: "warning-light", children: "Warning Light" },
};

export const DestructiveLight: Story = {
  args: { variant: "destructive-light", children: "Destructive Light" },
};

export const PrimaryOutline: Story = {
  args: { variant: "primary-outline", children: "Primary Outline" },
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <IconCheck />
        Verified
      </Badge>
      <Badge variant="info">
        <IconAlertCircle />
        Info
      </Badge>
    </div>
  ),
};
