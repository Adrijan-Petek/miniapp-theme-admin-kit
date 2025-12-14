import type { ThemeConfig } from "./types";
import { DEFAULT_THEME } from "./defaultTheme";

const KEY = "miniapp_theme_v1";

export function loadTheme(): ThemeConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_THEME;
    const parsed = JSON.parse(raw) as ThemeConfig;
    return {
      ...DEFAULT_THEME,
      ...parsed,
      links: { ...DEFAULT_THEME.links, ...parsed.links },
      features: { ...DEFAULT_THEME.features, ...parsed.features },
    };
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: ThemeConfig) {
  localStorage.setItem(KEY, JSON.stringify(theme));
}

export function resetTheme() {
  localStorage.removeItem(KEY);
}

export function exportTheme(theme: ThemeConfig) {
  const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "miniapp-theme.json";
  a.click();
  URL.revokeObjectURL(url);
}

export async function importThemeFile(file: File): Promise<ThemeConfig> {
  const text = await file.text();
  const parsed = JSON.parse(text) as ThemeConfig;
  return {
    ...DEFAULT_THEME,
    ...parsed,
    links: { ...DEFAULT_THEME.links, ...parsed.links },
    features: { ...DEFAULT_THEME.features, ...parsed.features },
  };
}
