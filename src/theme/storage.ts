import type { ThemeConfig, ThemePalette } from "./types";
import { DEFAULT_THEME } from "./defaultTheme";

const KEY = "miniapp_theme_v1";

function mergePalette(base: ThemePalette, patch?: Partial<ThemePalette>): ThemePalette {
  return { ...base, ...(patch ?? {}) };
}

function normalizeTheme(raw: Partial<ThemeConfig> & Record<string, any>): ThemeConfig {
  const legacyPalette = {
    background: raw.background,
    panel: raw.panel,
    text: raw.text,
    muted: raw.muted,
  } as Partial<ThemePalette>;

  const lightPalette = mergePalette(
    DEFAULT_THEME.palettes.light,
    raw.palettes?.light ?? raw.light ?? {},
  );

  const darkPalette = mergePalette(
    DEFAULT_THEME.palettes.dark,
    raw.palettes?.dark ?? raw.dark ?? legacyPalette ?? {},
  );

  return {
    ...DEFAULT_THEME,
    ...raw,
    accent: raw.accent ?? DEFAULT_THEME.accent,
    accentForeground: raw.accentForeground ?? DEFAULT_THEME.accentForeground,
    font: raw.font ?? DEFAULT_THEME.font,
    mode: raw.mode ?? DEFAULT_THEME.mode,
    palettes: {
      light: lightPalette,
      dark: darkPalette,
    },
    links: { ...DEFAULT_THEME.links, ...(raw.links ?? {}) },
    features: { ...DEFAULT_THEME.features, ...(raw.features ?? {}) },
  };
}

export function loadTheme(): ThemeConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_THEME;
    const parsed = JSON.parse(raw) as Partial<ThemeConfig>;
    return normalizeTheme(parsed);
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
  const parsed = JSON.parse(text) as Partial<ThemeConfig>;
  return normalizeTheme(parsed);
}
