# WHDS Monorepo

This repo contains the WHDS design-system packages and the local apps used to develop them.

## Packages

- `@keys2design/whds-ui`: React components such as `Button`, `Badge`, and `Switch`
- `@keys2design/whds-tailwind-preset`: shared Tailwind CSS preset and generated design-system styles used internally by the UI package build

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

The release build still generates UI package styles from the internal `packages/tailwind-preset` package, but only `@keys2design/whds-ui` needs to be published.
