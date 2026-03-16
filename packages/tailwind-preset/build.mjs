import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { baseLayerCss, buildThemeCss } from "./src/foundation.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "dist")
mkdirSync(distDir, { recursive: true })

const tokensDistDir = join(__dirname, "..", "tokens", "dist")
const tailwindThemeCss = buildThemeCss()
const cssVarsCss = readFileSync(join(tokensDistDir, "css-vars.css"), "utf8")

const baseLayerCssText = Object.entries(baseLayerCss)
  .map(([selector, rules]) => {
    const body = Object.entries(rules)
      .map(([declaration, value]) =>
        typeof value === "object"
          ? `    ${declaration};`
          : `    ${declaration}: ${value};`
      )
      .join("\n")

    return `  ${selector} {\n${body}\n  }`
  })
  .join("\n")

const stylesCss = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

${tailwindThemeCss}

${cssVarsCss}

@layer base {
${baseLayerCssText}
}
`

writeFileSync(join(distDir, "styles.css"), stylesCss)
console.log("Built @keys2design/whds-tailwind-preset: dist/styles.css")
