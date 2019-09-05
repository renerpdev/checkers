const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    devtool: 'source-map',

    devServer: {
        inline: true,
        contentBase: path.resolve('./src'),
        port: '3001',
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
        }),
    ]
});