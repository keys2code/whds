# `@keys2design/whds-ui`

WHDS React UI components for buttons, badges, and switches.

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
import { Button, Switch, Badge } from "@keys2design/whds-ui"

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary">New</Badge>
      <Switch />
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
```

## Peer dependencies

- `react`
- `react-dom`

## Included exports

- Root entry: `@keys2design/whds-ui`
- Styles: `@keys2design/whds-ui/globals.css` (theme included)
- PostCSS config: `@keys2design/whds-ui/postcss.config`
- Component subpaths under `@keys2design/whds-ui/components/*`
