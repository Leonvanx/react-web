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
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
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
  plugins: ['react', '@typescript-eslint/eslint-plugin', 'react-hooks', 'jsx-a11y'],
  // 规则配置
  ignorePatterns: ['config/*', 'scripts/*', 'package-lock.json', 'package.json'],
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
    'no-debugger': process.env === 'production' ? 1 : 0,
    '@typescript-eslint/explicit-member-accessibility': [1, { accessibility: 'no-public' }], // class成员可访问性默认public
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
  // 指定react版本防止lint报错
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    }
  }
};
// ];
