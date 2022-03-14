const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join (__dirname, './release'), // 服务器根目录
    open: false, // true:默认打开浏览器
    port: 9000,
  },
};
