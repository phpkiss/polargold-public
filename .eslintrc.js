module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "prefer-template": "error",
    camelcase: "error",
    radix: "error",
    "object-curly-spacing": ["error", "always"],
    "indent": ["error", 2],
    "newline-before-return": "error",
    "quotes": ["error", "double"],
    "max-len": ["error", { "code": 100 }],
    "semi": ["error", "always"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-explicit-any": "off"
  },
  parserOptions: {
    sourceType: "module",
  },
};
