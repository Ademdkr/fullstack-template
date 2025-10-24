/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: false,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: { es2022: true, worker: true, browser: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  ignorePatterns: ["dist/**"],
  rules: {
    // Blocker im Worker-Code deaktivieren
    "@typescript-eslint/no-explicit-any": "off"
  }
};
