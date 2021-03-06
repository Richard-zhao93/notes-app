module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [2, 'single'], // 默认使用单引号
    semi: 0, // 不强制使用分号
    'no-trailing-spaces': 1
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
