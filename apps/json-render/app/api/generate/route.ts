import { anthropic } from "@ai-sdk/anthropic"
import { generateCatalogPrompt } from "@json-render/core"
import { streamText } from "ai"
import { catalog } from "@/lib/catalog"

export const runtime = "edge"

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt: string }

  const systemPrompt = generateCatalogPrompt(catalog)

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: systemPrompt,
    prompt,
  })

  return result.toTextStreamResponse()
}
