module.exports = {
  // export default [
  // {
  root: true,
  // 环境，这里可以设置环来做区别判断
  env: {
    browser: true,
    es6: true
  },
  // 使用的扩展库
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'plugin:prettier/recommended'],
  // 解析器用于解析代码
  parser: '@typescript-eslint/parser',
  // 解析器配置
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 5,
    sourceType: 'module'
  },
  // 可以全局使用变量
  globals: {
    Babel: true,
    React: true,
    PATH_ENV: true
  },
  // 第三方插件
  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  // 规则配置
  ignorePatterns: ['config/*', '!**/.eslintrc.js'],
  rules: {
    semi: 0,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
      }
    ],
    'no-useless-escape': 2,
    'no-tabs': 'off',
    'no-debugger': 1,
    '@typescript-eslint/explicit-member-accessibility': ['off']
  }
};
// ];
