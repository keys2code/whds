# `@keys2design/whds-ui`

WHDS React UI components for buttons, badges, switches, avatars, labels, and separators.

## Installation

```bash
npm install @keys2design/whds-ui react react-dom
```

## Setup

Import the shared WHDS styles once in your app entrypoint:

```tsx
import "@keys2design/whds-ui/globals.css"
```

## Usage

```tsx
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Label,
  Separator,
  Switch,
} from "@keys2design/whds-ui"

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>WH</AvatarFallback>
      </Avatar>
      <Label htmlFor="notifications">Notifications</Label>
      <Switch id="notifications" />
      <Separator orientation="vertical" />
      <Badge variant="secondary">New</Badge>
      <Button>Continue</Button>
    </div>
  )
}
```

You can also import components by subpath:

```tsx
import { Button } from "@keys2design/whds-ui/components/button"
import { Switch } from "@keys2design/whds-ui/components/switch"
import { Badge } from "@keys2design/whds-ui/components/reui/badge"
import { Avatar } from "@keys2design/whds-ui/components/avatar"
import { Label } from "@keys2design/whds-ui/components/label"
import { Separator } from "@keys2design/whds-ui/components/separator"
```

## Peer dependencies

- `react`
- `react-dom`

## Included exports

- Root entry: `@keys2design/whds-ui`
- Styles: `@keys2design/whds-ui/globals.css` (theme included)
- PostCSS config: `@keys2design/whds-ui/postcss.config`
- Component subpaths under `@keys2design/whds-ui/components/*`
