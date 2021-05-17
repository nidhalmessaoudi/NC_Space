const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const CleanPlugin = require("clean-webpack-plugin");

dotenv.config();

module.exports = {
  mode: "production",
  entry: "./src/ts/app.ts",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  // devtool: "none",
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
    new CleanPlugin.CleanWebpackPlugin(),
  ],
};
