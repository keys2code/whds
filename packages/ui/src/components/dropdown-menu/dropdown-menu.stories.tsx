import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./index.js"
import { Button } from "../button/index.js"

const meta = {
  title: "Components/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm">Open menu</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithCheckboxItems: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm">View options</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>Display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem defaultChecked>
            Show status
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Show timestamp
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithRadioGroup: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm">Theme</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="system">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithSubMenu: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm">More options</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Slack</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithDestructiveItem: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm">Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete permanently</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
