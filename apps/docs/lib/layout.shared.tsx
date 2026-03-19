import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "WHDS",
    },
    searchToggle: {
      enabled: false,
    },
    links: [
      {
        text: "Registry",
        url: "/",
      },
    ],
  }
}
