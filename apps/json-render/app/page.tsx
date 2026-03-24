"use client"

import { JSONUIProvider, Renderer, useUIStream } from "@json-render/react"
import { registry } from "@/lib/registry"

const EXAMPLE_PROMPTS = [
  "A contact form with name, email, and message fields",
  "A user profile card with name, role badge, and action buttons",
  "A pricing table with three tiers: Free, Pro, and Enterprise",
  "A settings panel with toggles and a save button",
]

function Playground() {
  const { tree, isStreaming, send } = useUIStream({
    api: "/api/generate",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get("prompt") as string
    if (prompt.trim()) send(prompt)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground">JR</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold">json-render playground</h1>
            <p className="text-xs text-muted-foreground">AI-generated UIs from natural language</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Describe a UI, watch it appear</h2>
          <p className="text-muted-foreground">
            Claude reads your prompt and streams back structured JSON that renders into real
            components.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <input
            name="prompt"
            placeholder="Describe the UI you want to generate..."
            className="h-11 flex-1 rounded-lg border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming}
            className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isStreaming ? "Generating…" : "Generate"}
          </button>
        </form>

        <div className="mb-10 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              disabled={isStreaming}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="min-h-48 rounded-xl border border-border bg-card p-6">
          {isStreaming && !tree && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              Generating…
            </div>
          )}
          {!isStreaming && !tree && (
            <p className="text-center text-sm text-muted-foreground">
              Your generated UI will appear here
            </p>
          )}
          {tree && <Renderer tree={tree} registry={registry} loading={isStreaming} />}
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <JSONUIProvider
      registry={registry}
      actionHandlers={{
        submit: ({ formId }) => console.log("Submit form:", formId),
        navigate: ({ url }) => window.open(url as string, "_blank"),
        alert: ({ message }) => alert(message as string),
      }}
    >
      <Playground />
    </JSONUIProvider>
  )
}
