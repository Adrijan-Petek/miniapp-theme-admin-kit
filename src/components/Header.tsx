import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "./ui";

export function Header({ right }: { right?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-[color:var(--bg)]/80 backdrop-blur">
      {theme.showAnnouncement && (
        <div className="border-b border-slate-900 bg-slate-950/60 px-4 py-2 text-xs text-slate-200">
          <span className="mr-2">📢</span>
          {theme.announcementText}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={theme.logoUrl} alt="logo" className="h-9 w-9 rounded-xl border border-slate-800 bg-slate-950/40 p-1" />
          <div style={{ fontFamily: "var(--font)" }}>
            <div className="text-sm font-bold text-slate-50">{theme.title}</div>
            <div className="text-xs text-[color:var(--muted)]">{theme.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {right}
          <a href="/admin">
            <Button className="hidden sm:inline-flex">Admin</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
