import React, { useEffect, useState } from "react";
import { Button, Card } from "../components/ui";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useTheme } from "../theme/ThemeProvider";
import { farcasterReady, getFarcasterProfile, emitEvent } from "../sdk/farcaster";

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
    setStatus("connecting…");
    emitEvent("connect_farcaster_clicked");
    const p = await getFarcasterProfile();
    setProfile(p);
    setStatus(p?.fid ? "connected" : "connected (context not available)");
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)]" style={{ fontFamily: "var(--font)", color: "var(--text)" }}>
      <Header right={<div className="hidden sm:flex text-xs text-[color:var(--muted)]">{profile?.fid ? `FID: ${profile.fid}` : "Not connected"}</div>} />
      <main className="mx-auto w-full max-w-5xl px-4 py-6">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-extrabold">Mini App Home</div>
                <div className="mt-1 text-sm text-[color:var(--muted)]">
                  Toggle modules in <span className="font-semibold">/admin</span>.
                </div>
              </div>
              <span className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-[color:var(--muted)]">
                status: {status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {theme.features.enableFarcasterConnect && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="text-sm font-bold">Farcaster</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Connect to read user context and track engagement.
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="primary" onClick={connectFarcaster}>Connect Farcaster</Button>
                    <div className="text-xs text-[color:var(--muted)]">
                      {profile?.username ? `@${profile.username}` : "No username in context"}
                    </div>
                  </div>
                </div>
              )}

              {theme.features.enableWalletConnect && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="text-sm font-bold">Wallet</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Placeholder module. Drop in wagmi/RainbowKit later.
                  </div>
                  <div className="mt-3">
                    <Button onClick={() => emitEvent("wallet_connect_clicked")}>Connect Wallet</Button>
                  </div>
                </div>
              )}

              {theme.features.enableDailyClaim && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="text-sm font-bold">Daily Claim</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">
                    Replace this with your onchain claim call.
                  </div>
                  <div className="mt-3">
                    <Button variant="primary" onClick={() => emitEvent("daily_claim_clicked")}>Claim</Button>
                  </div>
                </div>
              )}

              {theme.features.enableLeaderboard && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="text-sm font-bold">Leaderboard</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">Plug in your backend/subgraph/events.</div>
                  <div className="mt-3 grid gap-2 text-xs text-[color:var(--muted)]">
                    <div className="flex justify-between"><span>1) Tank_01</span><span className="text-slate-100 font-semibold">1280</span></div>
                    <div className="flex justify-between"><span>2) MemeMage</span><span className="text-slate-100 font-semibold">1044</span></div>
                    <div className="flex justify-between"><span>3) Joybit</span><span className="text-slate-100 font-semibold">980</span></div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="text-sm font-bold">Quick Actions</div>
            <div className="mt-1 text-xs text-[color:var(--muted)]">Point these to contracts/APIs/events.</div>
            <div className="mt-4 grid gap-2">
              <Button variant="primary" onClick={() => emitEvent("primary_action", { at: Date.now() })}>Primary action</Button>
              <Button onClick={() => emitEvent("secondary_action")}>Secondary action</Button>
              <Button onClick={() => window.open(theme.links.primaryUrl, "_blank")}>Open {theme.links.primaryLabel}</Button>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/30 p-4 text-xs text-[color:var(--muted)]">
              Want real admin control? Store ThemeConfig in a backend (KV/DB) and fetch on load.
            </div>
          </Card>
        </div>

        <Footer />
      </main>
    </div>
  );
}
