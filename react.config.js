// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: process.env.PORT || 9000,
    open: true,
    proxy: {
      '/apiProxy': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/apiProxy': ''
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src/types'),
      pages: path.resolve(__dirname, 'src/pages'),
      comps: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      modules: path.resolve(__dirname, 'src/modules')
    }
  },
  module: {
    // babel解析规则,例如：如下的解析.less文件
    // 虽然引入了less编译后的custom-default.css，但是并不包括message样式，如果注释会导致message样式有问题。
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  // 'primary-color': '#CA3142',
                  // 'link-color': '#CA3142',
                  // 'border-radius-base': '2px',
                  'font-size-base': '14px'
                },
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  // 这里可以存放要使用的插件
  plugins: []
};
