import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist/**', '.next/**', 'node_modules/**'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'tailwindcss': eslintPluginTailwindCSS,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
    },
  },
];