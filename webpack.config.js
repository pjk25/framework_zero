module.exports = {
    entry: './spec/',
    output: {
        filename: 'spec.js'
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }]
    }
};
