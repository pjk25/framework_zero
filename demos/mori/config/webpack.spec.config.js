const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(require('./webpack.common.config'), {
    entry: ['babel-polyfill', './spec/'],
    module: {
        rules: [
            {test: /\.json$/, loader: 'json-loader'}
        ]
    }
});
