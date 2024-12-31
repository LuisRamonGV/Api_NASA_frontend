const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"], // Solo aplica a archivos TypeScript
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      // Elimina puntos y comas innecesarios
      "semi": ["error", "never"],

      // Evita comas innecesarias
      "no-extra-semi": "error",

      // Detecta espacios o tabs adicionales
      "no-multi-spaces": "error",
      "no-trailing-spaces": "error",

      // Asegura el uso de indentación consistente (2 espacios por tabulación)
      "indent": ["error", 2],

      // Elimina imports no utilizados
      "unused-imports/no-unused-imports": "error",

      // Detecta variables no usadas
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
