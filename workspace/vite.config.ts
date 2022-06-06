import { readFileSync } from "fs";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "@libs/Zui": resolve(__dirname, "./libs/Zui"),
      "@libs/Hammer": resolve(__dirname, "./libs/Hammer"),
    },
  },
  server: {
    https: {
      cert: readFileSync(resolve(__dirname, "../certs/cert.pem")),
      key: readFileSync(resolve(__dirname, "../certs/key.pem")),
    },
  },
});
