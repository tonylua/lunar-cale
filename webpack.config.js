var
  webpack = require('webpack'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  libraryName = 'lunar-cale',
  outputFile = libraryName + '.js',
  UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
  env = require('yargs').argv.mode,
  plugins = [];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
}

let config = {
  entry: __dirname + '/src/lunar_cale.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    "mobile-utils": "mobile-utils"
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.less$/,
        loader: true //env==='build'
          ? "style!css!postcss!less?noIeCompat"
          : "style!css!less"
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['iOS >=3', 'Android >=2']
    })
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins
};

module.exports = config;