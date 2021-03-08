const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const { default: merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        PUBLIC_URL: JSON.stringify(path.resolve(__dirname, "../public")),
      },
    }),
  ],
  module: {
    rules: [
      {
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        test: /\.(css|sass|scss)$/,
      },
    ],
  },
};

module.exports = merge(common, prodConfig);
