import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

const meta = {
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content with some placeholder text for demonstration.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const Compact: Story = {
  render: (args) => (
    <Card {...args} size="sm" className="w-[350px]">
      <CardHeader>
        <CardTitle>Compact Card</CardTitle>
        <CardDescription>Smaller padding and gaps.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card uses the sm size variant.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Footer</p>
      </CardFooter>
    </Card>
  ),
};
