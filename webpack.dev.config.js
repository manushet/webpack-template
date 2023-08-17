const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: {
            directory: path.join(process.cwd(), 'dist'),
            publicPath: '/',
        },
        client: {
            overlay: true,
        },        
        compress: true,
        port: 9000,
        hot: true,
    },     
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})


