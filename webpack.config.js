const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = (env) => ({
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // '[name].[contenthash].bundle.js'
    publicPath: '/', // 可配置CDN
  },
  target: 'web',
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    watchContentBase: true,
    host: 'localhost',
    port: 8081,
    hot: true,
    open: true,
    progress: true,
    inline: true,
    clientLogLevel: 'none',
    historyApiFallback: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          chunks: 'all',
          minSize: 30000, // 模块大于30k会被抽离到公共模块
          minChunks: 1, // 模块出现1次就会被抽离到公共模块
          maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
          maxInitialRequests: 3, // 入口模块最多只能加载3个
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'default',
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    // 转换某些类型的模块的源代码
    rules: [
      // {test: /\.ts$/, use: ''}
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  // 打包优化，资源管理，注入环境变量
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html', title: 'TBMicroServices' }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
});
