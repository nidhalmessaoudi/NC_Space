const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: "development",
  entry: "./src/ts/app.ts",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      node_modules: path.join(__dirname, "node_modules"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "NC Space",
      publicPath: "",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
    new webpack.EnvironmentPlugin({
      NC_SPACE_API: JSON.stringify(process.env.NC_SPACE_API),
    }),
  ],
};
