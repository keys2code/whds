# Design registry

Generated registry files use the layout:

`registry/base-nova/<item-name>/components/*.tsx` and `registry/base-nova/<item-name>/lib/utils.ts`.

Emitted component sources import via `@/registry/base-nova/...` (configure `paths` in the consumer app so `@/*` resolves to your app root, or alias `@/registry` accordingly).

- Run `pnpm run registry:prepare` to sync from `packages/ui` into `registry/` and `registry.json`.
- Run `pnpm run build:registry` to build `public/r/*.json` for static hosting.

Legacy `items/` output has been removed; paths are now `registry/base-nova/...`.
