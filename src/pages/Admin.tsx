import React, { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button, Card, Input, Label } from "../components/ui";
import { ThemeEditor } from "../components/ThemeEditor";
import { useTheme } from "../theme/ThemeProvider";

const SESSION_KEY = "miniapp_admin_session_v1";

function isAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "ok";
}

export function Admin() {
  const { theme } = useTheme();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(isAuthed());
  const [error, setError] = useState<string | null>(null);

  const expected = useMemo(() => import.meta.env.VITE_ADMIN_PASSWORD || "change-me", []);

  const login = () => {
    if (!password) return setError("Enter password");
    if (password !== expected) return setError("Wrong password");
    sessionStorage.setItem(SESSION_KEY, "ok");
    setAuthed(true);
    setError(null);
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPassword("");
  };

  if (!authed) {
    return (
      <div className="app-shell">
        <Header />
        <main className="mx-auto w-full max-w-xl px-4 py-8">
          <Card>
            <div className="text-lg font-extrabold">Admin Panel</div>
            <div className="mt-1 text-sm text-[color:var(--muted)]">Login to customize branding and features.</div>

            <div className="mt-5 grid gap-3">
              <div>
                <Label>Admin password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                  {error}
                </div>
              )}

              <Button variant="primary" onClick={login}>
                Sign in
              </Button>

              <div className="mt-3 text-xs text-[color:var(--muted)]">
                Warning: demo auth uses client-side Vite env. For production, move auth to a server.
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header right={theme.features.enableAdminQuickActions ? <Button onClick={logout}>Logout</Button> : null} />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold">Admin Settings</div>
            <div className="mt-1 text-sm text-[color:var(--muted)]">Edit theme and feature flags.</div>
          </div>
          <a href="/" className="text-sm text-[color:var(--accent)] hover:underline">
            Back to app
          </a>
        </div>

        <ThemeEditor />
        <Footer />
      </main>
    </div>
  );
}
