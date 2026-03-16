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
const accentsDir = join(tokensDir, "accents")
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

const themeVars = {
  "color-background": "var(--background)",
  "color-foreground": "var(--foreground)",
  "color-card": "var(--card)",
  "color-card-foreground": "var(--card-foreground)",
  "color-popover": "var(--popover)",
  "color-popover-foreground": "var(--popover-foreground)",
  "color-primary": "var(--primary)",
  "color-primary-foreground": "var(--primary-foreground)",
  "color-secondary": "var(--secondary)",
  "color-secondary-foreground": "var(--secondary-foreground)",
  "color-muted": "var(--muted)",
  "color-muted-foreground": "var(--muted-foreground)",
  "color-accent": "var(--accent)",
  "color-accent-foreground": "var(--accent-foreground)",
  "color-destructive": "var(--destructive)",
  "color-border": "var(--border)",
  "color-input": "var(--input)",
  "color-ring": "var(--ring)",
  "color-chart-1": "var(--chart-1)",
  "color-chart-2": "var(--chart-2)",
  "color-chart-3": "var(--chart-3)",
  "color-chart-4": "var(--chart-4)",
  "color-chart-5": "var(--chart-5)",
  "radius-sm": "calc(var(--radius) * 0.6)",
  "radius-md": "calc(var(--radius) * 0.8)",
  "radius-lg": "var(--radius)",
  "radius-xl": "calc(var(--radius) * 1.4)",
  "radius-2xl": "calc(var(--radius) * 1.8)",
  "radius-3xl": "calc(var(--radius) * 2.2)",
  "radius-4xl": "calc(var(--radius) * 2.6)",
  "color-sidebar": "var(--sidebar)",
  "color-sidebar-foreground": "var(--sidebar-foreground)",
  "color-sidebar-primary": "var(--sidebar-primary)",
  "color-sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
  "color-sidebar-accent": "var(--sidebar-accent)",
  "color-sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
  "color-sidebar-border": "var(--sidebar-border)",
  "color-sidebar-ring": "var(--sidebar-ring)",
  "font-sans": "var(--font-sans)",
  "color-warning-foreground": "var(--warning-foreground)",
  "color-warning": "var(--warning)",
  "color-info-foreground": "var(--info-foreground)",
  "color-info": "var(--info)",
  "color-success-foreground": "var(--success-foreground)",
  "color-success": "var(--success)",
  "color-destructive-foreground": "var(--destructive-foreground)",
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"))
}

function buildAccentCss() {
  const accentFiles = readdirSync(accentsDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort()

  return Object.fromEntries(
    accentFiles.flatMap((fileName) => {
      const accentName = parse(fileName).name
      const accent = loadJson(join(accentsDir, fileName))
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
      light: loadJson(join(tokensDir, "light.json")),
      dark: loadJson(join(tokensDir, "dark.json")),
    },
    css: {
      ...buildAccentCss(),
      "@layer base": {
        "*": {
          "@apply border-border outline-ring/50": {},
        },
        body: {
          "@apply bg-background text-foreground": {},
        },
      },
    },
    meta: {
      sources: [
        "packages/tokens/src/light.json",
        "packages/tokens/src/dark.json",
        "packages/tokens/src/accents/*.json",
        "packages/tailwind-preset/build.mjs",
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
    registryDependencies: [baseItemName],
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
