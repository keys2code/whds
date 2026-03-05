"use client";

import { useTheme } from "next-themes";
import { useThemeContext } from "@/lib/theme-context";
import type { ColorAccent } from "@/lib/theme-context";

import { IconSun, IconMoon, IconDeviceDesktop, IconPalette } from "@tabler/icons-react";

const appearanceOptions = [
  { label: "Light", value: "light", icon: <IconSun size={18} /> },
  { label: "Dark", value: "dark", icon: <IconMoon size={18} /> },
  { label: "System", value: "system", icon: <IconDeviceDesktop size={18} /> },
];

const colorAccentOptions: { label: string; value: ColorAccent; icon: React.ReactNode }[] = [
  { label: "Fuschia", value: "fuschia", icon: <IconPalette size={18} /> },
  { label: "Blue", value: "blue", icon: <IconPalette size={18} /> },
  { label: "Red", value: "red", icon: <IconPalette size={18} /> },
  { label: "Neutral", value: "neutral", icon: <IconPalette size={18} /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { colorAccent, setColorAccent } = useThemeContext();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative inline-block">
        <select
          aria-label="Select appearance"
          className="appearance-none rounded-lg border border-input bg-background px-2.5 py-1.5 pr-8 text-sm text-foreground"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {appearanceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
          {appearanceOptions.find((t) => t.value === theme)?.icon}
        </span>
      </div>
      <div className="relative inline-block">
        <select
          aria-label="Select color accent"
          className="appearance-none rounded-lg border border-input bg-background px-2.5 py-1.5 pr-8 text-sm text-foreground"
          value={colorAccent}
          onChange={(e) => setColorAccent(e.target.value as ColorAccent)}
        >
          {colorAccentOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
          {colorAccentOptions.find((t) => t.value === colorAccent)?.icon}
        </span>
      </div>
    </div>
  );
}
