import typescriptEslint       from '@typescript-eslint/eslint-plugin'
// @ts-ignore
import parser                 from '@typescript-eslint/parser'

import jsxA11y                from 'eslint-plugin-jsx-a11y'
import react                  from 'eslint-plugin-react'
import reactHooks             from 'eslint-plugin-react-hooks'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import { Linter }             from 'eslint'

import { eslintrc }           from './rules'

export const eslintFlatConfig: Linter.FlatConfig[] = [
  {
    rules: eslintrc,
    files: ['**'],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      'eslint-plugin-react-hooks': eslintPluginReactHooks,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      react: {
        pragma: 'React',
        version: '18.2.0',
      },
      propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {},
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          generators: false,
          objectLiteralDuplicateProperties: false,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
]
