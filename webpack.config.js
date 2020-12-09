const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.tsx'
    // vendor: '' // 第三方库
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js' // '[name].[contenthash].bundle.js'
    // publicPath // 可配置CDN
  },
  target: 'web',
  mode: 'development', // development  production
  module: {
    // 转换某些类型的模块的源代码
    rules: [
      // {test: /\.ts$/, use: ''}
      { test: /\.less$/i, use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        { loader: 'postcss-loader'},
        { loader: 'less-loader' }
      ]},
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/i,
        use: 'babel-loader'
      },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  // 打包优化，资源管理，注入环境变量
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './public/index.html', title: 'TBMicroServices'})
  ]
};