import React from "react";
import { useTheme } from "../theme/ThemeProvider";

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="mt-6 border-t border-[color:var(--border)] px-4 py-4 text-xs text-[color:var(--muted)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>Mini App Theme Kit - Customize branding, features, and layout.</span>
        <div className="flex gap-3">
          <a className="hover:text-[color:var(--text)]" href={theme.links.primaryUrl} target="_blank" rel="noreferrer">
            {theme.links.primaryLabel}
          </a>
          <a className="hover:text-[color:var(--text)]" href={theme.links.secondaryUrl} target="_blank" rel="noreferrer">
            {theme.links.secondaryLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
