const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'none',
  entry: {
    'large-number-calculate': './src/index.js',
    'large-number-calculate.min': './src/index.js',
  },
  output: {
    filename: "[name].js",
    library: 'largeNumberCalculate',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}