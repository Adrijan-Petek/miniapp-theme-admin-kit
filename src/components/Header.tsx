import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "./ui";

export function Header({ right }: { right?: React.ReactNode }) {
  const { theme, resolvedMode, setMode } = useTheme();

  const cycleMode = () => {
    const next = theme.mode === "system" ? "light" : theme.mode === "light" ? "dark" : "system";
    setMode(next);
  };

  const modeLabel = theme.mode === "system" ? `Auto (${resolvedMode})` : theme.mode;

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--border)] bg-[color:var(--bg)]/80 backdrop-blur">
      {theme.showAnnouncement && (
        <div className="border-b border-[color:var(--border)] bg-[color:var(--panel-muted)] px-4 py-2 text-xs text-[color:var(--text)]">
          {theme.announcementText}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={theme.logoUrl}
            alt="logo"
            className="h-9 w-9 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-1"
          />
          <div style={{ fontFamily: "var(--font)" }}>
            <div className="text-sm font-bold text-[color:var(--text)]">{theme.title}</div>
            <div className="text-xs text-[color:var(--muted)]">{theme.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {right}
          <Button variant="ghost" onClick={cycleMode}>
            Mode: {modeLabel}
          </Button>
          <a href="/admin">
            <Button className="hidden sm:inline-flex">Admin</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
