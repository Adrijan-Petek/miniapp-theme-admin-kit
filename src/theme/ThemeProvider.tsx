import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ThemeConfig, ThemeMode } from "./types";
import { loadTheme, saveTheme } from "./storage";

type ThemeContextValue = {
  theme: ThemeConfig;
  resolvedMode: Exclude<ThemeMode, "system">;
  setTheme: (next: ThemeConfig) => void;
  setMode: (mode: ThemeMode) => void;
};
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(() => loadTheme());
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("dark");

  const setTheme = (next: ThemeConfig) => {
    setThemeState(next);
    saveTheme(next);
  };

  const setMode = (mode: ThemeMode) => {
    setThemeState((prev) => {
      const next = { ...prev, mode };
      saveTheme(next);
      return next;
    });
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const compute = () => (theme.mode === "system" ? (media.matches ? "dark" : "light") : theme.mode);
    const update = () => setResolvedMode(compute());
    update();
    if (theme.mode === "system") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
  }, [theme.mode]);

  useEffect(() => {
    const root = document.documentElement;
    const palette = resolvedMode === "dark" ? theme.palettes.dark : theme.palettes.light;
    root.dataset.theme = resolvedMode;
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-foreground", theme.accentForeground);
    root.style.setProperty("--bg", palette.background);
    root.style.setProperty("--panel", palette.panel);
    root.style.setProperty("--panel-muted", palette.panelMuted);
    root.style.setProperty("--text", palette.text);
    root.style.setProperty("--muted", palette.muted);
    root.style.setProperty("--border", palette.border);
    root.style.setProperty("--ring", palette.ring);
    root.style.setProperty("--shadow-color", palette.shadow);
    root.style.colorScheme = resolvedMode;

    const fontFamily =
      theme.font === "inter"
        ? "\"Inter\", \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif"
        : theme.font === "spaceGrotesk"
          ? "\"Space Grotesk\", \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif"
          : theme.font === "mono"
            ? "\"IBM Plex Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
            : "\"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif";
    root.style.setProperty("--font", fontFamily);
  }, [theme, resolvedMode]);

  const value = useMemo(() => ({ theme, resolvedMode, setTheme, setMode }), [theme, resolvedMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
