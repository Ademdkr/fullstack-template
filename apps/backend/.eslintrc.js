/** @type {import('eslint').Linter.Config} */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ["./tsconfig.json", "./prisma/tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  overrides: [
    // Falls du schon overrides hast, belasse sie – dieser hier ist optional hilfreich:
    {
      files: ["prisma/**/*.ts"],
      parserOptions: {
        project: ["./prisma/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  ],
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // falls vorhanden
    'prettier'                      // mindestens dieser Eintrag sollte vorhanden sein
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
