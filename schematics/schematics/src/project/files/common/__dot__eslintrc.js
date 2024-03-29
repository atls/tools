require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['@atls/config-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'yarn.js', 'yarn-remote.cjs'],
}