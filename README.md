# Mini App Theme + Admin Kit

Professional mini app starter with a full theme system, admin panel, and modern UI modules.

## Screenshots
Light mode:
![Light mode](./light.png)

Dark mode:
![Dark mode](./dark.png)

## Features
- Theme system with light, dark, and system modes
- Admin panel at `/admin` with auto-apply theme edits
- Feature flags for core and pro modules
- Export/import theme JSON
- Farcaster Mini App SDK wrapper (no hard dependency)
- GitHub Actions CI (lint + build)

> Frontend-first for fast remixes. For real admin security and global config, wire ThemeConfig to a backend (KV or DB).

---

## Quickstart

### 1) Install
```bash
npm install
```

### 2) Configure env
```bash
cp .env.example .env
```

Set:
- `VITE_ADMIN_PASSWORD`

### 3) Run
```bash
npm run dev
```

Open:
- App: `http://localhost:5173/`
- Admin: `http://localhost:5173/admin`

---

## Theme system

- Stored in `localStorage` (`miniapp_theme_v1`)
- Light/dark palettes + accent color
- Applied via CSS variables:
  - `--accent`, `--accent-foreground`
  - `--bg`, `--panel`, `--panel-muted`
  - `--text`, `--muted`, `--border`, `--ring`, `--shadow-color`

Main files:
- `src/theme/ThemeProvider.tsx`
- `src/theme/storage.ts`
- `src/components/ThemeEditor.tsx`

---

## Pro modules

Toggle them in Admin:
- Insights (stats grid)
- Automation (playbooks)
- Status board (health and latency)

---

## Farcaster integration

This kit does not force-install any SDK.

If Farcaster injects `window.sdk`:
- `src/sdk/farcaster.ts` will call `sdk.actions.ready()`
- reads `sdk.context.user` defensively
- `emitEvent()` lets you send events if supported

---

## Deploy (Vercel)

1. Push to GitHub
2. Import in Vercel
3. Add env var: `VITE_ADMIN_PASSWORD`
4. Deploy

---

## GitHub Actions

`.github/workflows/ci.yml` runs:
- `npm ci`
- `npm run lint`
- `npm run build`

---

## License
MIT
