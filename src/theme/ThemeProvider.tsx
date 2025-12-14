import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ThemeConfig } from "./types";
import { loadTheme, saveTheme } from "./storage";

type ThemeContextValue = { theme: ThemeConfig; setTheme: (next: ThemeConfig) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(() => loadTheme());

  const setTheme = (next: ThemeConfig) => {
    setThemeState(next);
    saveTheme(next);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--bg", theme.background);
    root.style.setProperty("--panel", theme.panel);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);

    const fontFamily =
      theme.font === "inter"
        ? "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        : theme.font === "spaceGrotesk"
          ? ""Space Grotesk", system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
          : theme.font === "mono"
            ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace"
            : "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    root.style.setProperty("--font", fontFamily);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
