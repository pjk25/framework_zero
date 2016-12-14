module.exports = {
  entry: ['babel-polyfill', './spec/'],
  output: {
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    rules: [
      require('./config/babel_rule'),
      {test: /\.json$/, loader: 'json-loader'}
    ]
  }
}
