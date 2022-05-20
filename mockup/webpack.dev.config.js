const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base.config.js");

const config = {
  output: {
    path: path.resolve(__dirname, '_site/'),
    filename: 'include/js/[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
      filename: "index.html",
      inject: "body",
      title: 'Green Mountain Cannabis'
    }),
    new MiniCssExtractPlugin({
      filename: "dist/[name].css",
      // Extracted file and chunk location in relation to entry points (i.e. '/include/js')
      chunkFilename: "dist/[name].css"
    }),
  ],
};
module.exports = merge(base, config);
