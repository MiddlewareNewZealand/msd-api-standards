const jsxA11y = require("eslint-plugin-jsx-a11y");

// Deterministic, code-only accessibility linting for the site's React
// components (no build/rendering required). Scoped to src/**/*.{js,jsx} —
// the Docusaurus MDX content in docs/ is covered separately by
// scripts/validateAccessibility.js.
module.exports = [
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
];
