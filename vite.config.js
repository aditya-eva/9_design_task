import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        project1: resolve(__dirname, "project1.html"),
        project2: resolve(__dirname, "project2.html"),
      },
    },
  },
});