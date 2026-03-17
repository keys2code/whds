import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "dist")
const srcStylesDir = join(__dirname, "src", "styles")
const presetStylesPath = join(__dirname, "..", "tailwind-preset", "dist", "styles.css")

mkdirSync(distDir, { recursive: true })
mkdirSync(srcStylesDir, { recursive: true })

const presetStyles = readFileSync(presetStylesPath, "utf8")

writeFileSync(join(distDir, "theme.css"), presetStyles)
writeFileSync(join(srcStylesDir, "theme.css"), presetStyles)

writeFileSync(
  join(distDir, "globals.css"),
  `@import "./theme.css";

@source "./**/*.{js,mjs}";
`
)

console.log("Built @keys2design/whds-ui: dist/globals.css")
