const path = require('path');

module.exports = {
    entry: ['./src/index.js','./src/sass/main.scss'],
    output: {
        publicPath: '/',
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
            query: {
                presets: ["@babel/preset-react"]
            }
        }]
    },
}