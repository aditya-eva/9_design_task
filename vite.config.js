import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        project1: resolve(__dirname, "project1.html"),
        project2: resolve(__dirname, "project2.html"),
        project3: resolve(__dirname, "project3.html"),
        project4: resolve(__dirname, "./Project4/project4.html"),
        project5: resolve(__dirname, "./Project5/project5.html"),
        project6: resolve(__dirname, "./Project6/index.html"),
        project7: resolve(__dirname, "./Project7/index.html"),
        project8: resolve(__dirname, "./Project8/index.html"),
      },
    },
  },
});