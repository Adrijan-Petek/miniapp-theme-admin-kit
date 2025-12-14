import React, { useRef, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { exportTheme, importThemeFile, resetTheme } from "../theme/storage";
import type { ThemeConfig, FontChoice } from "../theme/types";
import { Button, Card, Input, Label, Select, Toggle } from "./ui";

function ColorField({ name, value, onChange }: { name: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{name}</Label>
      <div className="flex items-center gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="#22c55e" />
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 rounded-xl border border-slate-800 bg-slate-950/60" />
      </div>
    </div>
  );
}

export function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const [draft, setDraft] = useState<ThemeConfig>(theme);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const update = (patch: Partial<ThemeConfig>) => setDraft((d) => ({ ...d, ...patch }));
  const updateLinks = (patch: Partial<ThemeConfig["links"]>) => setDraft((d) => ({ ...d, links: { ...d.links, ...patch } }));
  const updateFeatures = (patch: Partial<ThemeConfig["features"]>) => setDraft((d) => ({ ...d, features: { ...d.features, ...patch } }));

  const apply = () => setTheme(draft);
  const doReset = () => {
    resetTheme();
    window.location.reload();
  };

  return (
    <div className="grid gap-4">
      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold">Brand</div>
            <div className="text-xs text-[color:var(--muted)]">Logo, title, colors, fonts.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={apply} variant="primary">Save</Button>
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
            <Input value={draft.logoUrl} onChange={(e) => update({ logoUrl: e.target.value })} placeholder="/logo.svg or https://..." />
          </div>

          <ColorField name="Accent" value={draft.accent} onChange={(v) => update({ accent: v })} />
          <ColorField name="Background" value={draft.background} onChange={(v) => update({ background: v })} />
          <ColorField name="Panel" value={draft.panel} onChange={(v) => update({ panel: v })} />
          <ColorField name="Text" value={draft.text} onChange={(v) => update({ text: v })} />
          <ColorField name="Muted" value={draft.muted} onChange={(v) => update({ muted: v })} />

          <div>
            <Label>Font</Label>
            <Select value={draft.font} onChange={(e) => update({ font: e.target.value as FontChoice })}>
              <option value="system">System</option>
              <option value="inter">Inter</option>
              <option value="spaceGrotesk">Space Grotesk</option>
              <option value="mono">Mono</option>
            </Select>
            <div className="mt-2 text-[11px] text-[color:var(--muted)]">
              Tip: for custom fonts, add a link tag in <code>index.html</code>.
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-3">
          <div className="text-sm font-bold">Announcement bar</div>
          <div className="text-xs text-[color:var(--muted)]">Top notice you can rotate weekly.</div>
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
          <div className="text-xs text-[color:var(--muted)]">Footer + quick navigation.</div>
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
          <div className="text-xs text-[color:var(--muted)]">Turn UI modules on/off.</div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle checked={draft.features.enableFarcasterConnect} onChange={(v) => updateFeatures({ enableFarcasterConnect: v })} label="Enable Farcaster connect" />
          <Toggle checked={draft.features.enableWalletConnect} onChange={(v) => updateFeatures({ enableWalletConnect: v })} label="Enable wallet connect placeholder" />
          <Toggle checked={draft.features.enableLeaderboard} onChange={(v) => updateFeatures({ enableLeaderboard: v })} label="Enable leaderboard section" />
          <Toggle checked={draft.features.enableDailyClaim} onChange={(v) => updateFeatures({ enableDailyClaim: v })} label="Enable daily claim section" />
          <Toggle checked={draft.features.enableAdminQuickActions} onChange={(v) => updateFeatures({ enableAdminQuickActions: v })} label="Enable admin quick actions" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-[color:var(--muted)]">
            For real admin control, store ThemeConfig in a backend (KV/DB).
          </div>
          <Button variant="danger" onClick={doReset}>Reset</Button>
        </div>
      </Card>
    </div>
  );
}
