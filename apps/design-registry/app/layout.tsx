import { Geist, Geist_Mono } from "next/font/google"

import "@keys2design/whds-ui/globals.css"

import { cn } from "@keys2design/whds-ui/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "WHDS Registry",
  description: "shadcn-compatible registry for WHDS components",
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
      className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
