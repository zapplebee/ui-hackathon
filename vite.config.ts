import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const useProxy = process.env.USE_PROXY;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888,
    proxy: useProxy
      ? {
          "/api": {
            target: useProxy,
            changeOrigin: true,
          },
        }
      : {},
  },
  plugins: [react()],
});
