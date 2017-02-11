const path = require('path');

module.exports = {
    entry: './spec/index.js',
    output: {
        filename: 'spec.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    }
};
