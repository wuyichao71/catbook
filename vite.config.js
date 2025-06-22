import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
  const root = path.resolve(__dirname, "client");
  const env = loadEnv(mode, root);
  const base = env.VITE_BASENAME;
  const outdir = env.VITE_OUTDIR;
  console.log(outdir);

  return {
    plugins: [react(), svgr()],
    root: path.resolve(__dirname, "client"), // Set the root directory for Vite
    build: {
      outDir: path.resolve(__dirname, `client/${outdir}`), // Output directory for production build
    },
    base: base,
    server: {
      port: 5174,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
        "/socket.io": {
          target: "http://localhost:3000",
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
