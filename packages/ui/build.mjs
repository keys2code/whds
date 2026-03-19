import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "dist")
const srcStylesDir = join(__dirname, "src", "styles")
const presetStylesPath = join(__dirname, "..", "tailwind-preset", "dist", "styles.css")
const twAnimateStylesPath = join(
  __dirname,
  "node_modules",
  "tw-animate-css",
  "dist",
  "tw-animate.css"
)
const shadcnStylesPath = join(
  __dirname,
  "node_modules",
  "shadcn",
  "dist",
  "tailwind.css"
)

function inlineCssImports(source) {
  const twAnimateStyles = readFileSync(twAnimateStylesPath, "utf8")
  const shadcnStyles = readFileSync(shadcnStylesPath, "utf8")

  return source
    .replace('@import "tw-animate-css";', twAnimateStyles)
    .replace('@import "shadcn/tailwind.css";', shadcnStyles)
}

mkdirSync(distDir, { recursive: true })
mkdirSync(srcStylesDir, { recursive: true })

const presetStyles = inlineCssImports(readFileSync(presetStylesPath, "utf8"))

writeFileSync(join(distDir, "theme.css"), presetStyles)
writeFileSync(join(srcStylesDir, "theme.css"), presetStyles)

writeFileSync(
  join(distDir, "globals.css"),
  `@import "./theme.css";

@source "./**/*.{js,mjs}";
@source "../src/**/*.{ts,tsx}";
`
)

console.log("Built @keys2design/whds-ui: dist/globals.css")
