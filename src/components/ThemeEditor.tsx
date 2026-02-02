import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { exportTheme, importThemeFile, resetTheme } from "../theme/storage";
import type { ThemeConfig, ThemeMode, ThemePalette, FontChoice } from "../theme/types";
import { Button, Card, Input, Label, Select, Toggle } from "./ui";

const AUTO_APPLY_KEY = "miniapp_theme_auto_apply_v1";

function ColorField({
  name,
  value,
  onChange,
  showPicker = true,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  showPicker?: boolean;
}) {
  return (
    <div>
      <Label>{name}</Label>
      <div className="flex items-center gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="#0ea5e9" />
        {showPicker && (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-12 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-muted)]"
          />
        )}
      </div>
    </div>
  );
}

export function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const [draft, setDraft] = useState<ThemeConfig>(theme);
  const [paletteKey, setPaletteKey] = useState<"light" | "dark">("dark");
  const [autoApply, setAutoApply] = useState(() => {
    const raw = localStorage.getItem(AUTO_APPLY_KEY);
    return raw ? raw === "true" : true;
  });
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setDraft(theme), [theme]);

  useEffect(() => {
    localStorage.setItem(AUTO_APPLY_KEY, String(autoApply));
  }, [autoApply]);

  useEffect(() => {
    if (!autoApply) return;
    const id = window.setTimeout(() => setTheme(draft), 200);
    return () => window.clearTimeout(id);
  }, [autoApply, draft, setTheme]);

  const update = (patch: Partial<ThemeConfig>) => setDraft((d) => ({ ...d, ...patch }));
  const updateLinks = (patch: Partial<ThemeConfig["links"]>) =>
    setDraft((d) => ({ ...d, links: { ...d.links, ...patch } }));
  const updateFeatures = (patch: Partial<ThemeConfig["features"]>) =>
    setDraft((d) => ({ ...d, features: { ...d.features, ...patch } }));
  const updatePalette = (patch: Partial<ThemePalette>) =>
    setDraft((d) => ({
      ...d,
      palettes: {
        ...d.palettes,
        [paletteKey]: { ...d.palettes[paletteKey], ...patch },
      },
    }));

  const apply = () => setTheme(draft);
  const doReset = () => {
    resetTheme();
    window.location.reload();
  };

  const palette = draft.palettes[paletteKey];

  return (
    <div className="grid gap-4">
      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold">Brand</div>
            <div className="text-xs text-[color:var(--muted)]">Logo, title, accents, fonts.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={apply} variant="primary">
              Save
            </Button>
            <Button onClick={() => exportTheme(draft)}>Export</Button>
            <Button onClick={() => fileRef.current?.click()}>Import</Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const next = await importThemeFile(f);
                setDraft(next);
              }}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>App title</Label>
            <Input value={draft.title} onChange={(e) => update({ title: e.target.value })} />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input value={draft.subtitle} onChange={(e) => update({ subtitle: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Logo URL</Label>
            <Input
              value={draft.logoUrl}
              onChange={(e) => update({ logoUrl: e.target.value })}
              placeholder="/logo.svg or https://..."
            />
          </div>

          <ColorField name="Accent" value={draft.accent} onChange={(v) => update({ accent: v })} />
          <ColorField
            name="Accent text"
            value={draft.accentForeground}
            onChange={(v) => update({ accentForeground: v })}
          />

          <div>
            <Label>Font</Label>
            <Select value={draft.font} onChange={(e) => update({ font: e.target.value as FontChoice })}>
              <option value="system">System</option>
              <option value="inter">Inter</option>
              <option value="spaceGrotesk">Space Grotesk</option>
              <option value="mono">IBM Plex Mono</option>
            </Select>
            <div className="mt-2 text-[11px] text-[color:var(--muted)]">
              Tip: for custom fonts, add a link tag in <code>index.html</code>.
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-3">
          <div className="text-sm font-bold">Appearance</div>
          <div className="text-xs text-[color:var(--muted)]">Light and dark theme control.</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label>Theme mode</Label>
            <Select value={draft.mode} onChange={(e) => update({ mode: e.target.value as ThemeMode })}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </div>
          <div>
            <Label>Edit palette</Label>
            <Select value={paletteKey} onChange={(e) => setPaletteKey(e.target.value as "light" | "dark")}>
              <option value="light">Light palette</option>
              <option value="dark">Dark palette</option>
            </Select>
          </div>
          <div className="flex items-end">
            <Toggle checked={autoApply} onChange={setAutoApply} label="Auto apply changes" />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ColorField name="Background" value={palette.background} onChange={(v) => updatePalette({ background: v })} />
          <ColorField name="Panel" value={palette.panel} onChange={(v) => updatePalette({ panel: v })} />
          <ColorField
            name="Panel muted"
            value={palette.panelMuted}
            onChange={(v) => updatePalette({ panelMuted: v })}
          />
          <ColorField name="Text" value={palette.text} onChange={(v) => updatePalette({ text: v })} />
          <ColorField name="Muted" value={palette.muted} onChange={(v) => updatePalette({ muted: v })} />
          <ColorField name="Border" value={palette.border} onChange={(v) => updatePalette({ border: v })} />
          <ColorField name="Ring" value={palette.ring} onChange={(v) => updatePalette({ ring: v })} />
          <ColorField
            name="Shadow"
            value={palette.shadow}
            onChange={(v) => updatePalette({ shadow: v })}
            showPicker={false}
          />
        </div>
      </Card>

      <Card>
        <div className="mb-3">
          <div className="text-sm font-bold">Announcement bar</div>
          <div className="text-xs text-[color:var(--muted)]">Top notice for releases and updates.</div>
        </div>
        <div className="grid gap-3">
          <Toggle checked={draft.showAnnouncement} onChange={(v) => update({ showAnnouncement: v })} label="Show announcement bar" />
          <div>
            <Label>Announcement text</Label>
            <Input value={draft.announcementText} onChange={(e) => update({ announcementText: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-3">
          <div className="text-sm font-bold">Links</div>
          <div className="text-xs text-[color:var(--muted)]">Footer and quick navigation.</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Primary label</Label>
            <Input value={draft.links.primaryLabel} onChange={(e) => updateLinks({ primaryLabel: e.target.value })} />
          </div>
          <div>
            <Label>Primary URL</Label>
            <Input value={draft.links.primaryUrl} onChange={(e) => updateLinks({ primaryUrl: e.target.value })} />
          </div>
          <div>
            <Label>Secondary label</Label>
            <Input value={draft.links.secondaryLabel} onChange={(e) => updateLinks({ secondaryLabel: e.target.value })} />
          </div>
          <div>
            <Label>Secondary URL</Label>
            <Input value={draft.links.secondaryUrl} onChange={(e) => updateLinks({ secondaryUrl: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-3">
          <div className="text-sm font-bold">Feature flags</div>
          <div className="text-xs text-[color:var(--muted)]">Turn modules on or off.</div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle checked={draft.features.enableFarcasterConnect} onChange={(v) => updateFeatures({ enableFarcasterConnect: v })} label="Enable Farcaster connect" />
          <Toggle checked={draft.features.enableWalletConnect} onChange={(v) => updateFeatures({ enableWalletConnect: v })} label="Enable wallet connect placeholder" />
          <Toggle checked={draft.features.enableLeaderboard} onChange={(v) => updateFeatures({ enableLeaderboard: v })} label="Enable leaderboard section" />
          <Toggle checked={draft.features.enableDailyClaim} onChange={(v) => updateFeatures({ enableDailyClaim: v })} label="Enable daily claim section" />
          <Toggle checked={draft.features.enableInsights} onChange={(v) => updateFeatures({ enableInsights: v })} label="Enable insights section" />
          <Toggle checked={draft.features.enableAutomation} onChange={(v) => updateFeatures({ enableAutomation: v })} label="Enable automation section" />
          <Toggle checked={draft.features.enableStatusBoard} onChange={(v) => updateFeatures({ enableStatusBoard: v })} label="Enable status board" />
          <Toggle checked={draft.features.enableAdminQuickActions} onChange={(v) => updateFeatures({ enableAdminQuickActions: v })} label="Enable admin quick actions" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-[color:var(--muted)]">
            For production control, store ThemeConfig in a backend (KV or DB).
          </div>
          <Button variant="danger" onClick={doReset}>
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}
