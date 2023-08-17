const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets',
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: './js/app.js',
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                test: /\.js$/,
                exclude: '/node_modules',
            },  
            {
                use: {
                    loader: 'vue-loader',
                    options: {
                        loader: {
                            scss: 'vue-style-loader!css-loader!sass-loader'
                        },
                    },
                },
                test: /\.vue$/,
            },                       
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: () => [precss, autoprefixer],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },                    
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer', {}
                                    ],
                                    [
                                        'precss', {}
                                    ],  
                                    [
                                        'css-mqpacker', {}
                                    ],  
                                    [
                                        'cssnano', 
                                        {
                                            preset: [
                                                'default', {
                                                    discardComments: {
                                                        removeAll: true,
                                                    }
                                                }
                                            ]
                                        }
                                    ],  
                                ]
                            },
                        },
                    },
                ],
            },            
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },           
        ],
    },      
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: './index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './img/', to: './assets/img/', noErrorOnMissing: true },
                { from: './static/', to: '', noErrorOnMissing: true },
            ],
        }),        
        new MiniCssExtractPlugin({ filename: './assets/css/style.[hash].css' }),
        new VueLoaderPlugin(),
    ],     
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
    },
    mode: 'development',
};