const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV ? "production" : "development",
  entry: {
    app: "./src/index.js"
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/dist/'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: ["env", "es2015"]
        }
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
    ],
    extensions: [".js", ".css"],
  },
  context: __dirname,
  target: "web",
}