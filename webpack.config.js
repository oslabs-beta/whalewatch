const path = require('path');

module.exports = {
  entry: path.join(__dirname, './server/index.js'),
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  }

}

