export type FontChoice = "system" | "inter" | "spaceGrotesk" | "mono";
export type ThemeMode = "system" | "light" | "dark";

export type ThemePalette = {
  background: string;
  panel: string;
  panelMuted: string;
  text: string;
  muted: string;
  border: string;
  ring: string;
  shadow: string;
};

export type ThemeConfig = {
  title: string;
  subtitle: string;
  logoUrl: string;
  accent: string;
  accentForeground: string;
  font: FontChoice;
  mode: ThemeMode;
  palettes: {
    light: ThemePalette;
    dark: ThemePalette;
  };

  showAnnouncement: boolean;
  announcementText: string;

  links: {
    primaryLabel: string;
    primaryUrl: string;
    secondaryLabel: string;
    secondaryUrl: string;
  };

  features: {
    enableFarcasterConnect: boolean;
    enableWalletConnect: boolean;
    enableLeaderboard: boolean;
    enableDailyClaim: boolean;
    enableAdminQuickActions: boolean;
    enableInsights: boolean;
    enableAutomation: boolean;
    enableStatusBoard: boolean;
  };
};
