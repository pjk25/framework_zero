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
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'babel-loader'},
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                target: 'es5',
                                declaration: false,
                                sourceMap: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
