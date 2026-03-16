import registry from "../registry.json"

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="flex max-w-2xl flex-col gap-4">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">
          WHDS
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight">Design Registry</h1>
          <p className="text-muted-foreground text-base leading-7">
            This app publishes your shadcn-compatible registry for v0 and other
            code assistants. The generated JSON is served from <code>/r</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            className="bg-primary text-primary-foreground inline-flex h-9 items-center rounded-lg px-4 font-medium"
            href="/r/registry.json"
          >
            Open registry.json
          </a>
          <span className="text-muted-foreground inline-flex h-9 items-center rounded-lg border px-4 font-mono text-xs">
            pnpm --filter @workspace/design-registry build
          </span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {registry.items.map((item) => (
          <article
            key={item.name}
            className="bg-card flex flex-col gap-3 rounded-2xl border p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-muted-foreground text-sm leading-6">
                  {item.description}
                </p>
              </div>
              <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs font-medium">
                {item.type.replace("registry:", "")}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.categories?.map((category) => (
                <span
                  key={category}
                  className="text-muted-foreground rounded-full border px-2 py-1 text-xs"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="bg-muted/40 rounded-xl border p-3 font-mono text-xs leading-6">
              <div>JSON: /r/{item.name}.json</div>
              <div>Install: npx shadcn@latest add http://localhost:3000/r/{item.name}.json</div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
