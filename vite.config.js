import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  const root = path.resolve(__dirname, "client");
  dotenv.config();
  const env = loadEnv(mode, __dirname);
  const base = env.VITE_BASENAME;
  const outdir = env.VITE_OUTDIR;
  const port = process.env.PORT;
  // console.log(port);
  // console.log(outdir);
  // console.log(base);
  // console.log(__dirname);

  return {
    plugins: [react(), svgr()],
    root: path.resolve(__dirname, "client"), // Set the root directory for Vite
    envDir: __dirname,
    build: {
      outDir: path.resolve(__dirname, `client/${outdir}`), // Output directory for production build
    },
    base: base || "/",
    // esbuild: {
    //   tsconfigRaw: "./tsconfig.json",
    // },
    server: {
      port: 5174,
      proxy: {
        "/api": {
          target: `http://localhost:${port}`,
          changeOrigin: true,
        },
        "/socket.io": {
          target: `http://localhost:${port}`,
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
