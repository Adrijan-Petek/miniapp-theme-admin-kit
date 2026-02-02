import type { ThemeConfig } from "./types";

export const DEFAULT_THEME: ThemeConfig = {
  title: import.meta.env.VITE_DEFAULT_TITLE ?? "Mini App Kit",
  subtitle: "Professional theme + admin panel starter",
  logoUrl: "/logo.svg",
  accent: import.meta.env.VITE_DEFAULT_ACCENT ?? "#0ea5e9",
  accentForeground: "#03131c",
  font: (import.meta.env.VITE_DEFAULT_FONT as any) ?? "spaceGrotesk",
  mode: "system",
  palettes: {
    dark: {
      background: "#0b1020",
      panel: "#121826",
      panelMuted: "#0f172a",
      text: "#e5e7eb",
      muted: "#9aa4b2",
      border: "#1f2a3a",
      ring: "#38bdf8",
      shadow: "rgba(2, 6, 23, 0.55)",
    },
    light: {
      background: "#f8fafc",
      panel: "#ffffff",
      panelMuted: "#f1f5f9",
      text: "#0f172a",
      muted: "#64748b",
      border: "#e2e8f0",
      ring: "#0ea5e9",
      shadow: "rgba(15, 23, 42, 0.12)",
    },
  },

  showAnnouncement: true,
  announcementText: "Announcement: Customize everything in /admin.",

  links: {
    primaryLabel: "Docs",
    primaryUrl: "https://docs.farcaster.xyz/",
    secondaryLabel: "GitHub",
    secondaryUrl: "https://github.com/",
  },

  features: {
    enableFarcasterConnect: true,
    enableWalletConnect: true,
    enableLeaderboard: true,
    enableDailyClaim: true,
    enableAdminQuickActions: true,
    enableInsights: true,
    enableAutomation: true,
    enableStatusBoard: true,
  },
};
