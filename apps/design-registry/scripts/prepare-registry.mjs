import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, parse } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const appDir = join(__dirname, "..")
const rootDir = join(appDir, "..", "..")
const uiComponentsDir = join(rootDir, "packages", "ui", "src", "components")
const tokensDir = join(rootDir, "packages", "tokens", "src")
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
  if (code.includes("@workspace/ui/components/")) {
    throw new Error(
      "Registry generator does not yet support component-to-component workspace imports."
    )
  }

  return code.replaceAll('@workspace/ui/lib/utils', "./utils")
}

function buildItem(componentFile, group) {
  const sourcePath = join(group.sourceDir, componentFile)
  const fileName = parse(componentFile).name
  const itemName = `${group.prefix}${fileName}`
  const outputDir = join(itemsDir, itemName)
  const componentTarget = `${fileName}.tsx`
  const sourceCode = rewriteSource(readFileSync(sourcePath, "utf8"))

  mkdirSync(outputDir, { recursive: true })
  writeFileSync(join(outputDir, componentTarget), sourceCode)

  const dependencySet = new Set()

  for (const specifier of extractImports(sourceCode)) {
    if (!specifier.startsWith(".") && !specifier.startsWith("@workspace/ui/")) {
      dependencySet.add(getPackageName(specifier))
    }
  }

  for (const sharedFile of sharedFiles) {
    const sharedCode = readFileSync(sharedFile.source, "utf8")
    writeFileSync(join(outputDir, sharedFile.target), sharedCode)

    for (const specifier of extractImports(sharedCode)) {
      if (!specifier.startsWith(".") && !specifier.startsWith("@workspace/ui/")) {
        dependencySet.add(getPackageName(specifier))
      }
    }
  }

  return {
    name: itemName,
    type: "registry:ui",
    title: titleFromName(itemName),
    description: `${titleFromName(itemName)} from the WHDS design system.`,
    categories: group.categories,
    dependencies: Array.from(dependencySet).sort(),
    cssVars: {
      light: JSON.parse(readFileSync(join(tokensDir, "light.json"), "utf8")),
      dark: JSON.parse(readFileSync(join(tokensDir, "dark.json"), "utf8")),
    },
    files: [
      {
        path: `items/${itemName}/${componentTarget}`,
        type: "registry:ui",
      },
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
    .sort()
}

rmSync(itemsDir, { recursive: true, force: true })
mkdirSync(itemsDir, { recursive: true })

const items = registryGroups.flatMap((group) =>
  getComponentFiles(group).map((componentFile) => buildItem(componentFile, group))
)

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

console.log(`Prepared ${items.length} registry items in apps/design-registry/items`)
