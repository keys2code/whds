import { readFile } from "node:fs/promises"

import { source } from "@/lib/source"

function stripMdx(sourceText: string) {
  return sourceText
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/^import\s.+$/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim().toLowerCase() ?? ""

  const pages = await Promise.all(
    source.getPages().map(async (page) => {
      const fileContents = page.absolutePath
        ? await readFile(page.absolutePath, "utf8")
        : ""
      const content = stripMdx(fileContents)

      return {
        url: page.url,
        title: page.data.title ?? page.slugs.at(-1) ?? "Untitled",
        description: page.data.description ?? "",
        breadcrumbs: page.slugs,
        content,
      }
    })
  )

  const results =
    query.length === 0
      ? pages
      : pages.filter((page) =>
          [page.title, page.description, page.content, page.breadcrumbs.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(query)
        )

  return Response.json({
    query,
    results,
  })
}
