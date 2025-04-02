import { defineConfig } from "eslint/config";
import globals, { browser, es2025 } from "globals";

export default defineConfig([
  {
    env: {
      browser: true,
      es2025: true,
      node: true,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
