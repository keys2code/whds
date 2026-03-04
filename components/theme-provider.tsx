"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeContextProvider } from "@/lib/theme-context";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <ThemeContextProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContextProvider>
  );
}
