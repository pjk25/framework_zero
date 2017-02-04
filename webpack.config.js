module.exports = {
  entry: ['babel-polyfill', './spec/'],
  output: {
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
