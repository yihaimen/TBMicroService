module.exports = {
  plugins: [
    'postcss-preset-env',
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['less', 'css'],
    }),
    require('autoprefixer'),
  ],
};
