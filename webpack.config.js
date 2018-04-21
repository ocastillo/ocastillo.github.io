const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'app/views');

const config = {
  context: path.resolve(__dirname, 'app/views'),
  entry: {
    home: APP_DIR + '/pages/home/homeView.jsx'
  },
  output: {
    path: BUILD_DIR + '/js',
    filename: '[name].js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = config;