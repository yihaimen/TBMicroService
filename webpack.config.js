const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx'
    // vendor: '' // 第三方库
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js' // '[name].[contenthash].bundle.js'
  },
  mode: 'development', // development  production
  module: {
    // 转换某些类型的模块
    rules: [
      // {test: /\.ts$/, use: ''}
    ]
  },
  // 打包优化，资源管理，注入环境变量
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'})
  ]
};