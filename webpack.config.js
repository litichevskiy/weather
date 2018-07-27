const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js', './src/style/index.scss'],
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'bundle.js',
  },
  resolve: {
      extensions: ['.scss', '.js', ' '],
  },
  plugins: [
    new ExtractTextPlugin('../css/bundle.css'),
    new webpack.DefinePlugin ({
      'process.env.NODE_ENV': JSON.stringify ( NODE_ENV )
    }),
    new SWPrecacheWebpackPlugin({
    cacheId: 'weather',
    filename: '../js/service-worker.js',
    staticFileGlobs: [
      '/',
      '/index.html',
      '/manifest.json',
      '/dist/js/bundle.js',
      '/dist/css/bundle.css',
      '/images/weather/clear.png',
      '/images/weather/cloudy.png',
      '/images/weather/fog.png',
      '/images/weather/partly-cloudy.png',
      '/images/weather/rain.png',
      '/images/weather/snow.png',
      '/images/weather/thunderstorm.png',
      '/images/weather/wind.png',
      '/images/poweredby.png',
      '/dist/fonts/MjQGmil5tffhpBrknsqsfamD.woff2',
      '/dist/fonts/MjQGmil5tffhpBrkntGsfamD.woff2',
      '/dist/fonts/MjQGmil5tffhpBrknt6sfQ.woff2',
    ],
    // stripPrefix: 'src/static/',
    mergeStaticsConfig: true,
    staticFileGlobsIgnorePatterns: [/\.map$/],
  }),
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