const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = env => ({
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // '[name].[contenthash].bundle.js'
    publicPath: '/' // 可配置CDN
  },
  target: 'web',
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    port: 8081
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js', '.json' ],
  },
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
      { test: /\.ts|tsx$/, use: 'ts-loader' }
    ]
  },
  // 打包优化，资源管理，注入环境变量
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({template: './public/index.html', title: 'TBMicroServices'}),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
});