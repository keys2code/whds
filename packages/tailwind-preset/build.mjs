import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "dist")
mkdirSync(distDir, { recursive: true })

const tokensDistDir = join(__dirname, "..", "tokens", "dist")
const tailwindThemeCss = readFileSync(
  join(tokensDistDir, "tailwind-theme.css"),
  "utf8"
)
const cssVarsCss = readFileSync(join(tokensDistDir, "css-vars.css"), "utf8")

const stylesCss = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

${tailwindThemeCss}

${cssVarsCss}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`

writeFileSync(join(distDir, "styles.css"), stylesCss)
console.log("Built @workspace/tailwind-preset: dist/styles.css")
