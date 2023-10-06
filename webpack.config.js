const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

module.exports = [
  {
    mode: NODE_ENV,
    devtool: !IS_PRODUCTION ? 'source-map' : false,
    entry: ['./src/js/sw.js'],
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: 'sw.js',
    },
    plugins:[],
    watch: !IS_PRODUCTION,
  },
  {
    mode: NODE_ENV,
    devtool: !IS_PRODUCTION ? 'source-map' : false,
    entry: ['babel-polyfill'],
    output: {
      path: path.resolve(__dirname, './dist/vendors'),
      filename: 'vendors.js',
    },
    plugins:[],
    watch: !IS_PRODUCTION,
  },
  {
    watch: !IS_PRODUCTION,
    devtool: !IS_PRODUCTION ? 'source-map' : false,
    // item.optimization = { minimize: true }
    mode: NODE_ENV,
    entry: ['./src/js/index.js', './src/style/index.scss'],
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.scss', '.js', ' '],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "../styles/[name].css",
        chunkFilename: "[id].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          exclude: /\/node_modules\//,
          use: [{
            loader: 'file-loader',
            options:{
              limit:15.000,
              name: '[name].[ext]',
              outputPath: '../images'
            }
          }],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: '../fonts/'
              }
          }]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !IS_PRODUCTION
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !IS_PRODUCTION,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !IS_PRODUCTION,
              }
            },
          ],
        }
      ]
    }
  }
];