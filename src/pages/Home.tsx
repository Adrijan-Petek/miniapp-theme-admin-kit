import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Badge } from "../components/ui";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useTheme } from "../theme/ThemeProvider";
import { farcasterReady, getFarcasterProfile, emitEvent } from "../sdk/farcaster";

type ActivityItem = {
  title: string;
  detail: string;
  tag: string;
};

export function Home() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState<{ fid?: number; username?: string; displayName?: string }>({});
  const [status, setStatus] = useState<string>("idle");

  useEffect(() => {
    (async () => {
      await farcasterReady();
      setProfile(await getFarcasterProfile());
    })();
  }, []);

  const connectFarcaster = async () => {
    setStatus("connecting...");
    emitEvent("connect_farcaster_clicked");
    const p = await getFarcasterProfile();
    setProfile(p);
    setStatus(p?.fid ? "connected" : "connected (context not available)");
  };

  const stats = useMemo(
    () => [
      { label: "Active users", value: "12.4k", delta: "+14%" },
      { label: "Retention", value: "63%", delta: "+4%" },
      { label: "Avg. session", value: "4m 12s", delta: "+9%" },
      { label: "Uptime", value: "99.98%", delta: "stable" },
    ],
    [],
  );

  const activity: ActivityItem[] = [
    { title: "Daily claim boosted", detail: "Reward window widened to 6h", tag: "release" },
    { title: "Leaderboard refresh", detail: "New weekly segment added", tag: "ops" },
    { title: "Wallet connect", detail: "Safety check upgraded", tag: "security" },
  ];

  return (
    <div className="app-shell">
      <Header
        right={
          <div className="hidden sm:flex text-xs text-[color:var(--muted)]">
            {profile?.fid ? `FID: ${profile.fid}` : "Not connected"}
          </div>
        }
      />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-lg font-extrabold">Mini App Control Room</div>
                <div className="mt-1 text-sm text-[color:var(--muted)]">
                  Professional kit for branded mini apps. Toggle modules in <span className="font-semibold">/admin</span>.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge>status: {status}</Badge>
                <Button variant="primary" onClick={() => emitEvent("primary_action", { at: Date.now() })}>
                  Launch update
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {theme.features.enableFarcasterConnect && (
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-4">
                  <div className="text-sm font-bold">Farcaster</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Connect to read user context and track engagement.
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="primary" onClick={connectFarcaster}>
                      Connect Farcaster
                    </Button>
                    <div className="text-xs text-[color:var(--muted)]">
                      {profile?.username ? `@${profile.username}` : "No username in context"}
                    </div>
                  </div>
                </div>
              )}

              {theme.features.enableWalletConnect && (
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-4">
                  <div className="text-sm font-bold">Wallet</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Placeholder module. Drop in wagmi or RainbowKit later.
                  </div>
                  <div className="mt-3">
                    <Button onClick={() => emitEvent("wallet_connect_clicked")}>Connect Wallet</Button>
                  </div>
                </div>
              )}

              {theme.features.enableDailyClaim && (
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-4">
                  <div className="text-sm font-bold">Daily Claim</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Replace this with your onchain claim call.
                  </div>
                  <div className="mt-3">
                    <Button variant="primary" onClick={() => emitEvent("daily_claim_clicked")}>
                      Claim
                    </Button>
                  </div>
                </div>
              )}

              {theme.features.enableLeaderboard && (
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-4">
                  <div className="text-sm font-bold">Leaderboard</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Plug in your backend, subgraph, or events.
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-[color:var(--muted)]">
                    <div className="flex justify-between">
                      <span>1) Tank_01</span>
                      <span className="font-semibold text-[color:var(--text)]">1280</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2) MemeMage</span>
                      <span className="font-semibold text-[color:var(--text)]">1044</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3) Joybit</span>
                      <span className="font-semibold text-[color:var(--text)]">980</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="grid gap-4">
            <Card>
              <div className="text-sm font-bold">Quick Actions</div>
              <div className="mt-1 text-xs text-[color:var(--muted)]">Point these to contracts, APIs, or events.</div>
              <div className="mt-4 grid gap-2">
                <Button variant="primary" onClick={() => emitEvent("primary_action", { at: Date.now() })}>
                  Primary action
                </Button>
                <Button onClick={() => emitEvent("secondary_action")}>Secondary action</Button>
                <Button onClick={() => window.open(theme.links.primaryUrl, "_blank")}>
                  Open {theme.links.primaryLabel}
                </Button>
              </div>
              <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-4 text-xs text-[color:var(--muted)]">
                Want real admin control? Store ThemeConfig in a backend and fetch on load.
              </div>
            </Card>

            {theme.features.enableStatusBoard && (
              <Card>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">Status board</div>
                  <Badge>live</Badge>
                </div>
                <div className="mt-3 grid gap-3 text-xs text-[color:var(--muted)]">
                  {[
                    { label: "API latency", value: "210ms", level: "72%" },
                    { label: "Claim success", value: "98.4%", level: "90%" },
                    { label: "Queue health", value: "stable", level: "84%" },
                  ].map((row) => (
                    <div key={row.label} className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span>{row.label}</span>
                        <span className="font-semibold text-[color:var(--text)]">{row.value}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[color:var(--panel-muted)]">
                        <div
                          className="h-2 rounded-full bg-[color:var(--accent)]"
                          style={{ width: row.level }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {theme.features.enableInsights && (
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <div className="text-xs text-[color:var(--muted)]">{stat.label}</div>
                <div className="mt-2 text-2xl font-extrabold">{stat.value}</div>
                <div className="mt-2 text-xs text-[color:var(--muted)]">{stat.delta}</div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {theme.features.enableAutomation && (
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">Automation</div>
                  <div className="text-xs text-[color:var(--muted)]">Default playbooks you can wire up.</div>
                </div>
                <Button variant="ghost" onClick={() => emitEvent("automation_clicked")}>
                  Manage
                </Button>
              </div>
              <div className="mt-4 grid gap-3 text-xs text-[color:var(--muted)]">
                {[
                  "Auto-publish weekly leaderboard",
                  "Refresh theme metadata from CMS",
                  "Send recap notifications on Mondays",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] px-3 py-2">
                    <span>{item}</span>
                    <Badge>ready</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Recent activity</div>
                <div className="text-xs text-[color:var(--muted)]">Release notes and product updates.</div>
              </div>
              <Button variant="ghost" onClick={() => emitEvent("activity_export")}>
                Export
              </Button>
            </div>
            <div className="mt-4 grid gap-3">
              {activity.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] px-3 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="mt-1 text-xs text-[color:var(--muted)]">{item.detail}</div>
                  </div>
                  <Badge>{item.tag}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Footer />
      </main>
    </div>
  );
}
