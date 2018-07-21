const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

// const PUBLIC_PATH = '/dist/';

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js', './src/style/index.scss'],
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'bundle.js',
    // filename: '[name]-[hash].js',
    // publicPath: PUBLIC_PATH,
  },
  resolve: {
      extensions: ['.scss', '.js', ' '],
  },
  plugins: [
    // new SWPrecacheWebpackPlugin({
    //   importScripts: ['/sw.js'],
    //   staticFileGlobs:[
    //     '/',
    //     'dist/js/bundle.js',
    //     'dist/css/bundle.css',
    //   ],
    //   stripPrefix: '/dist/',
    //   cacheId: 'my-project-name',
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   minify: IS_PRODUCTION,
    //   staticFileGlobsIgnorePatterns: [/\.map$/],
    // }),
    new ExtractTextPlugin('../css/bundle.css'),
  ],
  devtool: 'source-map',
  watch: !IS_PRODUCTION,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /\/node_modules\//,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'stage-0','env']
            }
        }
      },
      // {
      //   test: /\.(png|jp(e*)g|svg)$/,
      //   exclude: /\/node_modules\//,
      //   use: [{
      //       loader: 'url-loader',
      //   }]
      // },
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
        exclude: /\/node_modules\//,
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: !IS_PRODUCTION ,
                minimize:  IS_PRODUCTION,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                  plugins: [
                      autoprefixer({
                          browsers:['last 5 version']
                      })
                  ],
                  sourceMap: !IS_PRODUCTION
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: !IS_PRODUCTION }
            }
          ]
        })
      }
    ]
  }
};

if( IS_PRODUCTION ) {
    module.exports.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions:{
                minimize: true
            }
        })
    )
}

  // "babel-core": "^6.26.0",
  // "babel-loader": "^7.1.2",
  // "babel-plugin-transform-runtime": "^6.23.0",
  // "babel-polyfill": "^6.26.0",
  // "babel-preset-env": "^1.6.0",
  // "babel-preset-es2015": "^6.24.1",
  // "babel-preset-stage-0": "^6.24.1",
  // "babel-regenerator-runtime": "^6.5.0"