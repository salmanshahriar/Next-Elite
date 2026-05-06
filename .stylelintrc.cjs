/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'theme',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'alpha-value-notation': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'hue-degree-notation': null,
    'import-notation': null,
    'keyframes-name-pattern': null,
    'lightness-notation': null,
    'rule-empty-line-before': null,
  },
  ignoreFiles: ['**/.next/**', '**/node_modules/**', '**/dist/**', '**/build/**'],
};

