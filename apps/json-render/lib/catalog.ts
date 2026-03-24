import { createCatalog } from "@json-render/core"
import { z } from "zod"

export const catalog = createCatalog({
  components: {
    Stack: {
      props: z.object({
        direction: z.enum(["row", "column"]).nullable(),
        gap: z.enum(["sm", "md", "lg"]).nullable(),
        align: z.enum(["start", "center", "end"]).nullable(),
      }),
      hasChildren: true,
      description: "Flex container for laying out children horizontally or vertically",
    },
    Card: {
      props: z.object({
        title: z.string().nullable(),
        description: z.string().nullable(),
        variant: z.enum(["default", "outlined", "elevated"]).nullable(),
      }),
      hasChildren: true,
      description: "Container card with optional title and description",
    },
    Heading: {
      props: z.object({
        text: z.string(),
        level: z.enum(["h1", "h2", "h3", "h4"]).nullable(),
      }),
      description: "Section heading at various hierarchy levels",
    },
    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(["body", "caption", "label", "code"]).nullable(),
        muted: z.boolean().nullable(),
      }),
      description: "Text paragraph with optional visual variants",
    },
    Button: {
      props: z.object({
        label: z.string(),
        action: z.string().nullable(),
        variant: z.enum(["primary", "secondary", "ghost", "destructive"]).nullable(),
        size: z.enum(["sm", "md", "lg"]).nullable(),
        disabled: z.boolean().nullable(),
      }),
      description: "Clickable button that triggers a named action",
    },
    Input: {
      props: z.object({
        name: z.string(),
        label: z.string().nullable(),
        placeholder: z.string().nullable(),
        type: z.enum(["text", "email", "password", "number", "url"]).nullable(),
        required: z.boolean().nullable(),
      }),
      description: "Text input field with optional label and placeholder",
    },
    Badge: {
      props: z.object({
        label: z.string(),
        variant: z.enum(["default", "success", "warning", "error", "info"]).nullable(),
      }),
      description: "Small status indicator badge",
    },
    Divider: {
      props: z.object({}),
      description: "Horizontal rule to separate sections",
    },
  },
  actions: {
    submit: {
      params: z.object({ formId: z.string() }),
      description: "Submit a form identified by formId",
    },
    navigate: {
      params: z.object({ url: z.string() }),
      description: "Navigate the user to a URL",
    },
    alert: {
      params: z.object({ message: z.string() }),
      description: "Show an alert message to the user",
    },
  },
})
