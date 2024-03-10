// .eslintrc.js
module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "arrow-spacing": ["error", { before: true, after: true }],
    "object-curly-spacing": ["error", "always"],
    "no-console": "warn",
    "no-var": "error",
    "linebreak-style": ["error", "unix"],
    "function-paren-newline": ["error", "multiline"],
    "no-unused-vars": "warn",
  },
};
