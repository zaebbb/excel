const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const pathLink = link => path.resolve(__dirname, link)
const fileName = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: pathLink('src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: fileName('js'),
    path: pathLink('dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': pathLink('src'),
      '@core': pathLink('src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: pathLink('src/favicon.png'),
          to: pathLink('dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: isDev,
    compress: true,
    port: 3000,
  },
}
