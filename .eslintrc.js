module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: true }],
  },
};
