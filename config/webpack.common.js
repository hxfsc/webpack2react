const path = require("path")

const rootPath = path.resolve(__dirname, "../")
const distFilePath = path.resolve(rootPath, "dist")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  entry: path.resolve(rootPath, "./src/index.tsx"),
  output: {
    filename: "[name].[contenthash].js",
    path: distFilePath,
    clean: true,
    publicPath: "/"
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@/": path.resolve(rootPath, "./src")
    }
  },

  module: {
    rules: [
      {
        test: /\.[t|j]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
