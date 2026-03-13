import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { dirname, join, parse } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, "src")
const accentsDir = join(srcDir, "accents")
const distDir = join(__dirname, "dist")

mkdirSync(distDir, { recursive: true })

const light = JSON.parse(readFileSync(join(srcDir, "light.json"), "utf8"))
const dark = JSON.parse(readFileSync(join(srcDir, "dark.json"), "utf8"))

const accentFiles = readdirSync(accentsDir)
  .filter((fileName) => fileName.endsWith(".json"))
  .sort()

const accents = Object.fromEntries(
  accentFiles.map((fileName) => {
    const accentName = parse(fileName).name
    const accentPath = join(accentsDir, fileName)
    const accentData = JSON.parse(readFileSync(accentPath, "utf8"))
    return [accentName, accentData]
  })
)

function toCssVars(values) {
  return Object.entries(values)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n")
}

const accentCss = Object.entries(accents)
  .map(([accentName, accentValues]) => {
    return `
[data-accent="${accentName}"] {
${toCssVars(accentValues.light)}
}

.dark[data-accent="${accentName}"] {
${toCssVars(accentValues.dark)}
}`
  })
  .join("\n")

const cssVarsCss = `/* Generated from @workspace/tokens - do not edit directly */

:root {
${toCssVars(light)}
}

.dark {
${toCssVars(dark)}
}
${accentCss}
`

const tailwindThemeCss = `/* Tailwind theme mapping - import after tailwindcss */

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --font-sans: var(--font-sans);
  --color-warning-foreground: var(--warning-foreground);
  --color-warning: var(--warning);
  --color-info-foreground: var(--info-foreground);
  --color-info: var(--info);
  --color-success-foreground: var(--success-foreground);
  --color-success: var(--success);
  --color-destructive-foreground: var(--destructive-foreground);
}
`

writeFileSync(join(distDir, "css-vars.css"), cssVarsCss)
writeFileSync(join(distDir, "tailwind-theme.css"), tailwindThemeCss)
writeFileSync(
  join(distDir, "tokens.json"),
  JSON.stringify({ light, dark, accents }, null, 2)
)

console.log(
  "Built @workspace/tokens: dist/css-vars.css, dist/tailwind-theme.css, dist/tokens.json"
)
