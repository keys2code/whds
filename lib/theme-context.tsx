"use client";

import * as React from "react";

const ACCENT_STORAGE_KEY = "theme-accent";
const DENSITY_STORAGE_KEY = "theme-density";

export type ColorAccent = "fuschia" | "blue" | "red";
export type Density = "default" | "compact";

type ThemeContextValue = {
  colorAccent: ColorAccent;
  setColorAccent: (accent: ColorAccent) => void;
  density: Density;
  setDensity: (density: Density) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

function getStoredAccent(): ColorAccent {
  if (typeof window === "undefined") return "fuschia";
  const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
  if (stored === "blue" || stored === "red") return stored;
  return "fuschia";
}

function getStoredDensity(): Density {
  if (typeof window === "undefined") return "default";
  const stored = localStorage.getItem(DENSITY_STORAGE_KEY);
  if (stored === "compact") return "compact";
  return "default";
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [colorAccent, setColorAccentState] = React.useState<ColorAccent>("fuschia");
  const [density, setDensityState] = React.useState<Density>("default");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setColorAccentState(getStoredAccent());
    setDensityState(getStoredDensity());
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (colorAccent === "fuschia") {
      root.removeAttribute("data-accent");
    } else {
      root.setAttribute("data-accent", colorAccent);
    }
  }, [mounted, colorAccent]);

  React.useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (density === "default") {
      root.removeAttribute("data-density");
    } else {
      root.setAttribute("data-density", density);
    }
  }, [mounted, density]);

  const setColorAccent = React.useCallback((accent: ColorAccent) => {
    setColorAccentState(accent);
    localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  }, []);

  const setDensity = React.useCallback((d: Density) => {
    setDensityState(d);
    localStorage.setItem(DENSITY_STORAGE_KEY, d);
  }, []);

  const value: ThemeContextValue = {
    colorAccent,
    setColorAccent,
    density,
    setDensity,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return ctx;
}
