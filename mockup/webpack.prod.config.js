const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base.config.js");


const config = {
  output: {
    path: path.resolve(__dirname, '_site/'),
    filename: 'include/js/[name].[chunkhash].js',
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
      filename: "index.html",
      inject: "body",
      title: 'Green Mountain Cannabis'
    }),
    new MiniCssExtractPlugin({
      filename: 'include/css/[name].[chunkhash].css',
    }),
  ],
};
module.exports = merge(base, config);
