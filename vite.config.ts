import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
            "react-dom/client",
            "react/jsx-runtime",
          ],
          "three-engine": ["three"],
        },
      },
    },
  },
});
