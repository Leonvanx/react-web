const path = require('path');
module.exports = {
  //这里配置开发环境,以用来开发时做跨域请求等的设置，详情可以自行百度了解
  devServer: {
    port: process.env.PORT || 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      }
    }
  },
  resolve: {
    // 设置别名, 列如用@来代理src文件夹的绝对路径
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
                  'primary-color': '#CA3142',
                  'link-color': '#CA3142',
                  'border-radius-base': '2px',
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
