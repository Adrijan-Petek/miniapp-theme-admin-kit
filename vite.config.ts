import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/miniapp-theme-admin-kit/",
  plugins: [react()],
  server: { port: 5173 },
});
