import { defineConfig } from "vite";
import path from "path";

const srcPath = path.resolve(__dirname, "./src");

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@src\/(.*)/,
        replacement: `${srcPath}/$1`,
      },
      {
        find: /^pdfjs-dist$/,
        replacement: `pdfjs-dist/build/pdf.js`,
      },
    ],
  },
});
