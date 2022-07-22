module.exports = {
    root: true,
    // 环境，这里可以设置环来做区别判断
    env: {
      browser: true,
    },
    // 使用的扩展库
    extends: ['standard', 'standard-react'],
    // 解析器用于解析代码
    parser: 'babel-eslint',
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
    plugins: [],
    // 规则配置
    rules: {
      'no-unused-vars': 'off',
      semi: 0,
      'no-tabs': 'off'
    }
  }
