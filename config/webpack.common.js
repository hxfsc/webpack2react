const path = require("path")

const rootPath = path.resolve(__dirname, "../")
const distFilePath = path.resolve(rootPath, "dist")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  entry: path.resolve(rootPath, "./src/index.js"),
  output: {
    filename: "[name].[contenthash].js",
    path: distFilePath,
    clean: true,
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack2React",
      template: path.resolve(rootPath, "./src/index.html")
    })
  ].concat(
    devMode
      ? []
      : new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
  )
}
