var webpack = require('webpack');
 
module.exports = {
    //插件项
    plugins: [],
    //页面入口文件配置
    entry: {
        index : './src/Vue.js'
    },
    //入口文件输出配置
    output: {
        path: './dist/',
        filename: 'Vue.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015']
        }},
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};