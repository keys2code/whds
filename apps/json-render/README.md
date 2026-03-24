# json-render playground

A Next.js app that uses [json-render](https://json-render.dev) to generate UI components from natural language prompts via Claude.

The core idea: instead of asking an LLM to generate raw HTML or JSX, you define a **catalog** of typed components, Claude generates a structured JSON tree constrained to that catalog, and json-render renders it using your actual React components. The AI can't invent markup — it can only compose from what you've defined.

---

## Getting started

```bash
# Copy env template and fill in your API key
cp .env.local.example .env.local

# Start dev server (from repo root)
pnpm --filter json-render dev
```

The app runs at `http://localhost:3000` by default.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com) |

---

## Project structure

```
apps/json-render/
├── app/
│   ├── api/generate/route.ts   ← Streaming API route (Claude → JSON)
│   ├── globals.css             ← Imports workspace theme tokens
│   ├── layout.tsx
│   └── page.tsx                ← Playground UI (prompt input + renderer)
└── lib/
    ├── catalog.ts              ← What components the AI can use (schemas + descriptions)
    └── registry.tsx            ← How those components actually render in React
```

---

## How it works

### 1. The catalog (`lib/catalog.ts`)

The catalog is the contract between you and the AI. It defines every component Claude is allowed to generate, using Zod schemas for their props and a plain-English `description` that Claude uses to decide when to use each one.

```ts
Button: {
  props: z.object({
    label: z.string(),
    variant: z.enum(["primary", "secondary", "ghost", "destructive"]).nullable(),
  }),
  description: "Clickable button that triggers a named action",
}
```

`generateCatalogPrompt(catalog)` converts this into a system prompt injected into every request — Claude never sees arbitrary HTML, only the catalog spec.

### 2. The registry (`lib/registry.tsx`)

The registry maps each catalog component name to a real React component. Each renderer receives:

- `element.props` — the typed props Claude generated, validated against your Zod schema
- `children` — rendered child elements (for components with `hasChildren: true`)
- `onAction` — call this with `{ name, params }` to trigger a named action handler

```tsx
function Button({ element, onAction }: ComponentRenderProps<ButtonProps>) {
  return (
    <button onClick={() => onAction?.({ name: element.props.action, params: {} })}>
      {element.props.label}
    </button>
  )
}
```

### 3. The API route (`app/api/generate/route.ts`)

A single edge function that:
1. Injects the catalog system prompt
2. Streams Claude's response back to the client
3. json-render's `useUIStream` hook parses the streamed JSON incrementally and updates the `tree` as it arrives

### 4. The page (`app/page.tsx`)

`JSONUIProvider` is the all-in-one context wrapper. It accepts:
- `registry` — the component registry
- `actionHandlers` — named handlers for actions Claude can trigger (e.g. `submit`, `navigate`)

`useUIStream` manages the streaming state. The `Renderer` component takes the live `tree` and renders it using the registry.

---

## Available components

| Component | Props | Notes |
|---|---|---|
| `Stack` | `direction`, `gap`, `align` | Flex container — use for layout |
| `Card` | `title`, `description`, `variant` | Has children |
| `Heading` | `text`, `level` (h1–h4) | |
| `Text` | `content`, `variant`, `muted` | `variant: "code"` renders inline code |
| `Button` | `label`, `action`, `variant`, `size`, `disabled` | Triggers named actions |
| `Input` | `name`, `label`, `placeholder`, `type`, `required` | |
| `Badge` | `label`, `variant` | Status indicators |
| `Divider` | — | `<hr>` |

## Available actions

| Action | Params | What it does |
|---|---|---|
| `submit` | `formId: string` | Logs form submission (wire up your own handler) |
| `navigate` | `url: string` | Opens a URL in a new tab |
| `alert` | `message: string` | Calls `window.alert` |

---

## Adding a new component

**1. Define it in the catalog** (`lib/catalog.ts`):

```ts
Avatar: {
  props: z.object({
    src: z.string(),
    alt: z.string().nullable(),
    size: z.enum(["sm", "md", "lg"]).nullable(),
  }),
  description: "Round user avatar image",
},
```

**2. Add a renderer to the registry** (`lib/registry.tsx`):

```tsx
function Avatar({ element }: ComponentRenderProps<AvatarProps>) {
  const { src, alt, size } = element.props
  const sizeClass = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-12 w-12"
  return <img src={src} alt={alt ?? ""} className={`rounded-full object-cover ${sizeClass}`} />
}

// Add to the registry export:
export const registry: ComponentRegistry = {
  // ...existing
  Avatar,
}
```

That's it — Claude will start using `Avatar` automatically on the next request.

---

## Key design decisions

**Why custom components instead of `@json-render/shadcn`?**
We chose to build the component layer from scratch so the rendered output uses our own design tokens and Tailwind classes rather than shadcn defaults. The tradeoff is more initial code, but you get full control over styling and can reference `--color-primary`, `border-border`, etc. directly.

**Why `edge` runtime for the API route?**
The generate route uses `export const runtime = "edge"` for lower latency on streaming responses. If you need Node.js APIs (file system, native modules), remove that line.

**Why Zod for prop schemas?**
Zod schemas serve double duty: they generate the system prompt that constrains Claude's output, and they validate the parsed JSON before it reaches your components. If Claude hallucinates a prop value that doesn't match the schema, json-render catches it rather than passing bad data to your component.

**Streaming UX**
`useUIStream` parses the JSON incrementally — components can appear on screen before Claude finishes generating. The `loading` prop on `Renderer` lets you style the partial-render state however you want.

---

## Deploying

This app follows the same pattern as `apps/web` and deploys as a standard Next.js app. Set `ANTHROPIC_API_KEY` as an environment variable in your deployment platform.

```bash
# Build check
pnpm --filter json-render build
```
