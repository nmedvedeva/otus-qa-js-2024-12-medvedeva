import globals from 'globals'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jest from 'eslint-plugin-jest'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginPrettierRecommended,
  // DOC: https://www.npmjs.com/package/eslint-plugin-jest
  {
    files: ['specs/**'],
    ...jest.configs['flat/recommended']
  },
  {
    ignores: ['reports/**']
  }
)
