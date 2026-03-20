import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { baseLayerCss, buildThemeCss } from "./src/styles/foundation.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "dist")
const srcStylesDir = join(__dirname, "src", "styles")
const tokensCssVarsPath = join(__dirname, "..", "tokens", "dist", "css-vars.css")

function serializeCssRules(rulesBySelector) {
  return Object.entries(rulesBySelector)
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
}

mkdirSync(distDir, { recursive: true })
mkdirSync(srcStylesDir, { recursive: true })

const cssVarsCss = readFileSync(tokensCssVarsPath, "utf8")
const themeCss = buildThemeCss()
const baseLayerCssText = serializeCssRules(baseLayerCss)

const stylesCss = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

${themeCss}

${cssVarsCss}

@layer base {
${baseLayerCssText}
}
`

writeFileSync(join(distDir, "theme.css"), stylesCss)
writeFileSync(join(srcStylesDir, "theme.css"), stylesCss)

writeFileSync(
  join(distDir, "globals.css"),
  `@import "./theme.css";

@source "./**/*.{js,mjs}";
@source "../src/**/*.{ts,tsx}";
`
)

console.log("Built @keys2design/whds-ui: dist/globals.css")
