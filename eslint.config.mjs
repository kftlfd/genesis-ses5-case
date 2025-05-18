// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import * as eslintPluginImport from 'eslint-plugin-import';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslintPluginImport.flatConfigs?.recommended,
      eslintPluginImport.flatConfigs?.typescript,
    ],
    rules: {
      'import/order': [
        'warn',
        {
          'groups': [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'pathGroups': [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
);
