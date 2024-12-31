const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      "semi": ["error", "never"],

      "no-extra-semi": "error",

      "no-multi-spaces": "error",
      "no-trailing-spaces": "error",

      "indent": ["error", 2],

      "unused-imports/no-unused-imports": "error",

      "no-unused-vars": [
        "error",
        { "vars": "all", "args": "after-used", "ignoreRestSiblings": false },
      ],
    },
    plugins: {
      "unused-imports": require("eslint-plugin-unused-imports"),
    },
  },
]
