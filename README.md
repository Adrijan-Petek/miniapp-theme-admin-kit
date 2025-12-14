# Mini App Theme + Admin Kit

A clean **mini app starter** with:
- Theme system (logo, title, colors, font, announcement bar)
- Admin panel at `/admin` (password login)
- Feature flags (toggle UI modules on/off)
- Export / import theme JSON
- Farcaster Mini App SDK wrapper (no hard dependency)
- GitHub Actions CI (lint + build)

> Frontend-first for fast remixes. For real admin security + global config, wire ThemeConfig to a backend (KV/DB).

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
- Applied via CSS variables:
  - `--accent`, `--bg`, `--panel`, `--text`, `--muted`, `--font`

Main files:
- `src/theme/ThemeProvider.tsx`
- `src/theme/storage.ts`
- `src/components/ThemeEditor.tsx`

---

## Farcaster integration

This kit doesn’t force-install any SDK.

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
