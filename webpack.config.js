const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    },
    plugins: [new HtmlWebpackPlugin()]
};
