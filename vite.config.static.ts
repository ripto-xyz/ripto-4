import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Static deployment configuration - fixes external deployment issues
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },
  root: path.resolve(process.cwd(), "client"),
  build: {
    outDir: path.resolve(process.cwd(), "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(process.cwd(), "client", "index.html"),
    },
    assetsDir: "assets",
    sourcemap: false,
    minify: true,
  },
  base: "/",
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});