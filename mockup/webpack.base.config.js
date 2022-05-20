const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = {
  entry: {
    main: [
      path.resolve(__dirname, 'src/main.js'),
      path.resolve(__dirname, 'src/css/tailwind.css'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // { from: "./_site/include/fonts", to: "../Web/fonts" },
        { from: "./src/static", to: "../_site" },
      ],
    }),
  ]
};

module.exports = config;
