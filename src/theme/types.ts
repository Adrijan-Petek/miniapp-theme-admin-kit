export type FontChoice = "system" | "inter" | "spaceGrotesk" | "mono";

export type ThemeConfig = {
  title: string;
  subtitle: string;
  logoUrl: string;
  accent: string;
  background: string;
  panel: string;
  text: string;
  muted: string;
  font: FontChoice;

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
  };
};
