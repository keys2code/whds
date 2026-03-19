import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./global.css"
import "@keys2design/whds-ui/globals.css"

import { RootProvider } from "fumadocs-ui/provider/next"

import { cn } from "@keys2design/whds-ui/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "WHDS Docs",
    template: "%s | WHDS Docs",
  },
  description: "Documentation and component examples for the WHDS design system.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
