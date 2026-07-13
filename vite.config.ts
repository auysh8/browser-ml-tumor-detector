import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This line fixes the white screen!
  base: "/browser-ml-tumor-detector/",
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
