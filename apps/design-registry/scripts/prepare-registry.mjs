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

/** Must match `style` on base item and consumer registry layout. */
const REGISTRY_STYLE = "base-nova"

const registryHomepage =
  process.env.REGISTRY_HOMEPAGE ?? "http://localhost:3000"

const sharedFiles = [
  {
    source: join(rootDir, "packages", "ui", "src", "lib", "utils.ts"),
    target: "lib/utils.ts",
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
const skippedRegistryComponents = new Set()

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
    style: REGISTRY_STYLE,
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

/**
 * Rewrites WHDS package imports to @/registry/{style}/… for emitted registry files.
 */
function rewriteRegistryImports(code, currentItemName) {
  let out = code.replaceAll(
    "@keys2design/whds-ui/lib/utils",
    `@/registry/${REGISTRY_STYLE}/${currentItemName}/lib/utils`
  )

  const componentImportRe =
    /from\s+["']@keys2design\/whds-ui\/components\/([\w/-]+)["']/g
  out = out.replace(componentImportRe, (_, pathPart) => {
    let registryPath
    if (pathPart.startsWith("reui/")) {
      const base = pathPart.slice("reui/".length)
      const depItemName = `reui-${base}`
      registryPath = `@/registry/${REGISTRY_STYLE}/${depItemName}/components/${base}`
    } else if (!pathPart.includes("/")) {
      registryPath = `@/registry/${REGISTRY_STYLE}/${pathPart}/components/${pathPart}`
    } else {
      throw new Error(
        `Registry generator: unhandled @keys2design/whds-ui/components path "${pathPart}"`
      )
    }
    return `from "${registryPath}"`
  })

  if (out.includes("@keys2design/whds-ui/components/")) {
    throw new Error(
      "Registry generator: leftover @keys2design/whds-ui/components/ import after rewrite"
    )
  }

  return out
}

const registryDepRe = new RegExp(
  `@/registry/${REGISTRY_STYLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/([^/]+)/`,
  "g"
)

function collectRegistryDependencyNames(code, currentItemName) {
  const names = new Set()
  for (const match of code.matchAll(registryDepRe)) {
    const name = match[1]
    if (name !== currentItemName) {
      names.add(name)
    }
  }
  return names
}

function collectRegistryDependencies(codes, currentItemName) {
  const names = new Set([baseItemName])
  for (const c of codes) {
    for (const n of collectRegistryDependencyNames(c, currentItemName)) {
      names.add(n)
    }
  }
  return Array.from(names).sort()
}

function isNpmDependencySpecifier(specifier) {
  if (specifier.startsWith(".")) return false
  if (specifier.startsWith("@keys2design/whds-ui")) return false
  if (specifier.startsWith(`@/registry/`)) return false
  return true
}

function addNpmDependenciesFromCode(code, dependencySet) {
  for (const specifier of extractImports(code)) {
    if (isNpmDependencySpecifier(specifier)) {
      dependencySet.add(getPackageName(specifier))
    }
  }
}

function getLocalHelperFiles(sourceDir, fileName) {
  return readdirSync(sourceDir)
    .filter((entry) => entry.startsWith(`${fileName}-`))
    .filter((entry) => entry.endsWith(".ts") || entry.endsWith(".tsx"))
    .filter((entry) => !skippedRegistryComponents.has(entry))
    .sort()
}

function itemFilePath(itemName, ...segments) {
  return join("registry", REGISTRY_STYLE, itemName, ...segments).replaceAll(
    "\\",
    "/"
  )
}

function buildItem(componentFile, group) {
  const sourcePath = join(group.sourceDir, componentFile)
  const fileName = parse(componentFile).name
  const itemName = `${group.prefix}${fileName}`
  const outputDir = join(appDir, "registry", REGISTRY_STYLE, itemName)
  const componentsDir = join(outputDir, "components")
  const libDir = join(outputDir, "lib")
  const componentTarget = `${fileName}.tsx`

  const rawMain = readFileSync(sourcePath, "utf8")
  const sourceCode = rewriteRegistryImports(rawMain, itemName)
  const localHelperFiles = getLocalHelperFiles(group.sourceDir, fileName)

  mkdirSync(componentsDir, { recursive: true })
  mkdirSync(libDir, { recursive: true })
  writeFileSync(join(componentsDir, componentTarget), sourceCode)

  const allRewrittenCodes = [sourceCode]

  for (const helperFile of localHelperFiles) {
    const helperPath = join(group.sourceDir, helperFile)
    const rawHelper = readFileSync(helperPath, "utf8")
    const helperCode = rewriteRegistryImports(rawHelper, itemName)
    allRewrittenCodes.push(helperCode)
    writeFileSync(join(componentsDir, helperFile), helperCode)
  }

  for (const sharedFile of sharedFiles) {
    const sharedCode = readFileSync(sharedFile.source, "utf8")
    writeFileSync(join(outputDir, sharedFile.target), sharedCode)
  }

  const dependencySet = new Set()
  addNpmDependenciesFromCode(rawMain, dependencySet)
  for (const helperFile of localHelperFiles) {
    addNpmDependenciesFromCode(
      readFileSync(join(group.sourceDir, helperFile), "utf8"),
      dependencySet
    )
  }
  for (const sharedFile of sharedFiles) {
    addNpmDependenciesFromCode(
      readFileSync(sharedFile.source, "utf8"),
      dependencySet
    )
  }

  const registryDependencies = collectRegistryDependencies(
    allRewrittenCodes,
    itemName
  )

  return {
    name: itemName,
    type: "registry:ui",
    title: titleFromName(itemName),
    description: `${titleFromName(itemName)} from the WHDS design system.`,
    docs: itemDocs[itemName],
    categories: group.categories,
    dependencies: Array.from(dependencySet).sort(),
    registryDependencies,
    files: [
      {
        path: itemFilePath(itemName, "components", componentTarget),
        type: "registry:ui",
      },
      ...localHelperFiles.map((helperFile) => ({
        path: itemFilePath(itemName, "components", helperFile),
        type: "registry:ui",
      })),
      ...sharedFiles.map((sharedFile) => ({
        path: itemFilePath(itemName, ...sharedFile.target.split("/")),
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

const registryDir = join(appDir, "registry")
const legacyItemsDir = join(appDir, "items")

rmSync(registryDir, { recursive: true, force: true })
rmSync(legacyItemsDir, { recursive: true, force: true })

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
