const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(require('./config/webpack.common.config'), {
    entry: ['babel-polyfill', './src/app.js']
});