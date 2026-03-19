# WHDS Docs

This app hosts the Fumadocs-powered documentation site for WHDS.

## Local Development

```bash
pnpm --filter docs dev
```

## Vercel

- Root Directory: `apps/docs`
- Framework Preset: `Next.js`
- Node.js Version: `22.x`

The app README pins the recommended deployment target to Node `22.x`, while `package.json` keeps local development flexible with `engines.node >=22`.
