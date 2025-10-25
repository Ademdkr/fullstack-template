/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Optional: eigene Erleichterungen
  rules: {
    'subject-case': [2, 'never', ['start-case', 'pascal-case']],
    'scope-case': [2, 'always', ['kebab-case', 'lower-case']],
  }
};
