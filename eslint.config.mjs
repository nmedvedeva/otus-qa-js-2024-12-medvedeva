//@ts-check

import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jest from 'eslint-plugin-jest'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  eslintPluginPrettierRecommended,
  // DOC: https://www.npmjs.com/package/eslint-plugin-jest
  {
    ignores: ['reports']
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked]
  },
  {
    files: ['specs/**'],
    ...jest.configs['flat/recommended']
  }
)
