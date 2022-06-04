import { readFileSync } from "fs";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@libs/zui": resolve(__dirname, "./libs/zui"),
      "@libs/hammer": resolve(__dirname, "./libs/hammer"),
    },
  },
  server: {
    https: {
      cert: readFileSync(resolve(__dirname, "../certs/cert.pem")),
      key: readFileSync(resolve(__dirname, "../certs/key.pem")),
    },
  },
});
