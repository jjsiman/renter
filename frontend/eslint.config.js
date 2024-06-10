import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    commaDangle: 'only-multiline',
  }),
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
];
