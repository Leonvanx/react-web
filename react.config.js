const path = require('path')
module.exports = {
  resolve: {
    // 设置别名, 列如用@来代理src文件夹的绝对路径
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    // babel解析规则,例如：如下的解析.less文件
    rules: [
      {
        test: /\.less$/,
        exclude:/\.module\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              }
            }
          }
        ]
      }
    ]
  },
  // 这里可以存放要使用的插件
  plugins: [],
  //这里配置开发环境,以用来开发时做跨域请求等的设置，详情可以自行百度了解
  devServer: {
    port: process.env.PORT || 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      }
    }
  }
}
