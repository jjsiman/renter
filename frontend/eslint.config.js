import eslint from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'coverage/',
      'dist/',
    ],
  },
  stylistic.configs.customize({
    semi: true,
  }),
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'sort-imports': ['error', {
        ignoreCase: true,
      }],
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
];
