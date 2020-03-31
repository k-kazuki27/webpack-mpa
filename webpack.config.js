const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => ({
  entry: {
    'scripts/index': './src/scripts/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'sample-A.html',
      template: './src/sample-A.html',
      chunks: ['scripts/index']
    }),
    new HtmlWebpackPlugin({
      filename: 'sample-B.html',
      template: './src/sample-B.html',
      chunks: ['scripts/index']
    }),
    new MiniCssExtractPlugin({
      filename: 'common.css'
    })
  ]
})
