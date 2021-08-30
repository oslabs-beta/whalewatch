const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: path.join(__dirname, './client/index.js'),
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ]
  },
  target: 'node',
  // externals: {
  //   express: 'require(express)'
  // },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"],
  },
}

