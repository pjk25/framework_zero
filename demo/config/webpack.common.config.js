const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};
