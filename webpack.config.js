const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'app/client/public');
const APP_DIR = path.resolve(__dirname, 'app/client/src/js');

const config = {
  entry: {
    main: APP_DIR + '/index.jsx'
    // search: APP_DIR + '/search.jsx'
  },
  output: {
    path: BUILD_DIR + '/js',
    filename: '[name].bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;