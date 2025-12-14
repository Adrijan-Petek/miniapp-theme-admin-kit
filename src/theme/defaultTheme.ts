import type { ThemeConfig } from "./types";

export const DEFAULT_THEME: ThemeConfig = {
  title: import.meta.env.VITE_DEFAULT_TITLE ?? "Mini App Kit",
  subtitle: "Theme + Admin panel starter",
  logoUrl: "/logo.svg",
  accent: import.meta.env.VITE_DEFAULT_ACCENT ?? "#22c55e",
  background: "#020617",
  panel: "#0b1220",
  text: "#e5e7eb",
  muted: "#9ca3af",
  font: (import.meta.env.VITE_DEFAULT_FONT as any) ?? "system",

  showAnnouncement: true,
  announcementText: "📢 Welcome! Customize everything in /admin",

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
  },
};
