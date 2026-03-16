# WHDS Monorepo

This repo contains the WHDS design-system packages and the local apps used to develop them.

## Packages

- `@keys2design/whds-ui`: React components such as `Button`, `Badge`, and `Switch`
- `@keys2design/whds-tailwind-preset`: shared Tailwind CSS preset and generated design-system styles

## Package usage

```bash
npm install @keys2design/whds-ui @keys2design/whds-tailwind-preset react react-dom
```

```tsx
import "@keys2design/whds-ui/globals.css"
import { Button } from "@keys2design/whds-ui"
```

## Publishing

Before publishing, bump the versions for:

- `packages/tailwind-preset/package.json`
- `packages/ui/package.json`

Useful release commands:

```bash
pnpm release:verify
pnpm release:pack
pnpm publish:packages
```

Publish order matters because `@keys2design/whds-ui` depends on `@keys2design/whds-tailwind-preset`.
