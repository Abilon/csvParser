import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    }
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
];
