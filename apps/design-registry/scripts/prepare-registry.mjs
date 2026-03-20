import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, parse } from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

import { baseLayerCss, themeVars } from "../../../packages/ui/src/styles/foundation.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const appDir = join(__dirname, "..")
const rootDir = join(appDir, "..", "..")
const uiComponentsDir = join(rootDir, "packages", "ui", "src", "components")
const tokensDistPath = join(rootDir, "packages", "tokens", "dist", "tokens.json")
const itemsDir = join(appDir, "items")

const registryHomepage =
  process.env.REGISTRY_HOMEPAGE ?? "http://localhost:3000"

const sharedFiles = [
  {
    source: join(rootDir, "packages", "ui", "src", "lib", "utils.ts"),
    target: "utils.ts",
    type: "registry:lib",
  },
]

const registryGroups = [
  {
    sourceDir: uiComponentsDir,
    prefix: "",
    categories: ["ui"],
  },
  {
    sourceDir: join(uiComponentsDir, "reui"),
    prefix: "reui-",
    categories: ["ui", "reui"],
  },
]

const baseItemName = "whds-base"
const skippedRegistryComponents = new Set([
  "field.tsx",
  "input-group.tsx",
])

const itemDocs = {
  "reui-badge": `Important: This registry item must be used verbatim as the canonical WHDS badge primitive.

Do not normalize or simplify the API.
Do not rename \`default\` size to \`md\`.
Do not collapse the size scale.
Do not remove the \`xl\` size.
Do not replace this with a generic shadcn badge implementation.

The only valid size options are:
- \`xs\`
- \`sm\`
- \`default\`
- \`lg\`
- \`xl\`

Preserve all existing variants and exports from the source component.
Use \`whds-base\` as the styling foundation.`,
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"))
}

const tokens = loadJson(tokensDistPath)

function buildAccentCss() {
  return Object.fromEntries(
    Object.entries(tokens.accents).flatMap(([accentName, accent]) => {
      const lightVars = Object.fromEntries(
        Object.entries(accent.light).map(([key, value]) => [`--${key}`, value])
      )
      const darkVars = Object.fromEntries(
        Object.entries(accent.dark).map(([key, value]) => [`--${key}`, value])
      )

      return [
        [`[data-accent="${accentName}"]`, lightVars],
        [`.dark[data-accent="${accentName}"]`, darkVars],
      ]
    })
  )
}

function buildBaseItem() {
  return {
    name: baseItemName,
    type: "registry:base",
    title: "WHDS Base",
    description:
      "Foundation tokens, theme mappings, and base styles for the WHDS design system.",
    style: "base-nova",
    iconLibrary: "phosphor",
    baseColor: "zinc",
    categories: ["base", "theme"],
    cssVars: {
      theme: themeVars,
      light: tokens.light,
      dark: tokens.dark,
    },
    css: {
      ...buildAccentCss(),
      "@layer base": baseLayerCss,
    },
    meta: {
      sources: [
        "packages/tokens/dist/tokens.json",
        "packages/ui/src/styles/foundation.mjs",
      ],
    },
  }
}

function titleFromName(name) {
  return name
    .split("-")
    .map((part) => {
      if (part === "reui") return "REUI"
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(" ")
}

function getPackageName(specifier) {
  if (specifier.startsWith("@base-ui/react/")) {
    return "@base-ui/react"
  }

  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/")
  }

  return specifier.split("/")[0]
}

function extractImports(code) {
  const matches = code.matchAll(/from\s+["']([^"']+)["']/g)
  return Array.from(matches, (match) => match[1])
}

function rewriteSource(code) {
  if (code.includes("@keys2design/whds-ui/components/")) {
    throw new Error(
      "Registry generator does not yet support component-to-component workspace imports."
    )
  }

  return code.replaceAll('@keys2design/whds-ui/lib/utils', "./utils")
}

function getLocalHelperFiles(sourceDir, fileName) {
  return readdirSync(sourceDir)
    .filter((entry) => entry.startsWith(`${fileName}-`))
    .filter((entry) => entry.endsWith(".ts") || entry.endsWith(".tsx"))
    .filter((entry) => !skippedRegistryComponents.has(entry))
    .sort()
}

function buildItem(componentFile, group) {
  const sourcePath = join(group.sourceDir, componentFile)
  const fileName = parse(componentFile).name
  const itemName = `${group.prefix}${fileName}`
  const outputDir = join(itemsDir, itemName)
  const componentTarget = `${fileName}.tsx`
  const sourceCode = rewriteSource(readFileSync(sourcePath, "utf8"))
  const localHelperFiles = getLocalHelperFiles(group.sourceDir, fileName)

  mkdirSync(outputDir, { recursive: true })
  writeFileSync(join(outputDir, componentTarget), sourceCode)

  const dependencySet = new Set()

  for (const specifier of extractImports(sourceCode)) {
    if (!specifier.startsWith(".") && !specifier.startsWith("@keys2design/whds-ui/")) {
      dependencySet.add(getPackageName(specifier))
    }
  }

  for (const helperFile of localHelperFiles) {
    const helperPath = join(group.sourceDir, helperFile)
    const helperCode = rewriteSource(readFileSync(helperPath, "utf8"))

    writeFileSync(join(outputDir, helperFile), helperCode)

    for (const specifier of extractImports(helperCode)) {
      if (!specifier.startsWith(".") && !specifier.startsWith("@keys2design/whds-ui/")) {
        dependencySet.add(getPackageName(specifier))
      }
    }
  }

  for (const sharedFile of sharedFiles) {
    const sharedCode = readFileSync(sharedFile.source, "utf8")
    writeFileSync(join(outputDir, sharedFile.target), sharedCode)

    for (const specifier of extractImports(sharedCode)) {
      if (!specifier.startsWith(".") && !specifier.startsWith("@keys2design/whds-ui/")) {
        dependencySet.add(getPackageName(specifier))
      }
    }
  }

  return {
    name: itemName,
    type: "registry:ui",
    title: titleFromName(itemName),
    description: `${titleFromName(itemName)} from the WHDS design system.`,
    docs: itemDocs[itemName],
    categories: group.categories,
    dependencies: Array.from(dependencySet).sort(),
    registryDependencies: [baseItemName],
    files: [
      {
        path: `items/${itemName}/${componentTarget}`,
        type: "registry:ui",
      },
      ...localHelperFiles.map((helperFile) => ({
        path: `items/${itemName}/${helperFile}`,
        type: "registry:lib",
      })),
      ...sharedFiles.map((sharedFile) => ({
        path: `items/${itemName}/${sharedFile.target}`,
        type: sharedFile.type,
      })),
    ],
    meta: {
      source: sourcePath.replace(`${rootDir}/`, ""),
    },
  }
}

function getComponentFiles(group) {
  return readdirSync(group.sourceDir)
    .filter((fileName) => fileName.endsWith(".tsx"))
    .filter((fileName) => !skippedRegistryComponents.has(fileName))
    .sort()
}

rmSync(itemsDir, { recursive: true, force: true })
mkdirSync(itemsDir, { recursive: true })

const items = [
  buildBaseItem(),
  ...registryGroups.flatMap((group) =>
    getComponentFiles(group).map((componentFile) => buildItem(componentFile, group))
  ),
]

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "whds",
  homepage: registryHomepage,
  items,
}

writeFileSync(
  join(appDir, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`
)

console.log(`Prepared ${items.length} registry items in apps/design-registry`)
