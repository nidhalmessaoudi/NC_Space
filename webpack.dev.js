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
  },
  devServer: {
    open: true,
    contentBase: "dist",
    compress: true,
    port: 8080,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
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
      template: "./src/index.html",
    }),
    new webpack.EnvironmentPlugin({
      NC_SPACE_API: JSON.stringify(process.env.NC_SPACE_API),
    }),
  ],
};
