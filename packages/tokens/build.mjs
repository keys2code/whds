import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, parse } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, "src")
const accentsDir = join(srcDir, "accents")
const distDir = join(__dirname, "dist")

rmSync(distDir, { recursive: true, force: true })
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

writeFileSync(join(distDir, "css-vars.css"), cssVarsCss)
writeFileSync(
  join(distDir, "tokens.json"),
  JSON.stringify({ light, dark, accents }, null, 2)
)

console.log(
  "Built @workspace/tokens: dist/css-vars.css, dist/tokens.json"
)
