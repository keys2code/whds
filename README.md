# WHDS Monorepo

This repo contains the WHDS design-system packages and the local apps used to develop them.

## Packages

- `@keys2design/whds-ui`: React components and the generated WHDS theme CSS consumers import via `globals.css`

## Package usage

```bash
npm install @keys2design/whds-ui react react-dom
```

```tsx
import "@keys2design/whds-ui/globals.css"
import { Button } from "@keys2design/whds-ui"
```

The exported `@keys2design/whds-ui/globals.css` already includes the WHDS theme, so consumers do not need to install the preset separately.

## Publishing

Before publishing, bump the version for:

- `packages/ui/package.json`

Useful release commands:

```bash
pnpm release:verify
pnpm release:pack
pnpm publish:packages
```

The release build now generates the theme directly from source in `packages/ui`, and only `@keys2design/whds-ui` needs to be published. The current publish flow uses `--access public`.
