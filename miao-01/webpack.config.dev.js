const HtmlWebpackPlugin = require('html-webpack-plugin');// 生成html
const path = require('path');
const CleanWebpackPlugin=require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',// 项目的入口文件
    output: {// 输出的信息
        path: path.resolve(__dirname, 'dist/'),
        filename: 'assets/js/app.js',
        // 所有资源的基础路径，而且一定是/结尾
        publicPath:"/"
    },
    // mode:'development'// development开发, production生产----webpack  4版本
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',// 输出的文件名
            template: "src/index.html"//以哪个文件为模版
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            // js脚本
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            // 样式：处理css文件中出现的url，会自动帮你引入里面要引入的模块
            //[path]-[name]-[local]_[hash:base64:6]
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[path]-[name]-[local]_[hash:base64:6]'//默认是'[hash:base64]'
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/commom'),
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/commom'),
                ]
            },
            //scss
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[path]-[name]-[local]_[hash:base64:6]'//默认是'[hash:base64]'
                        }
                    },
                    'sass-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/commom'),
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/commom'),
                ]
            },
            // 图片
            // file-loader:
            // 1.把你的资源移动到输出目录
            // 2.返回最终引入资源的url
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',// file-loader增强版
                    options: {
                        limit: 10000,// 小于这个值才编码
                        name:'assets/img/[name]_[hash:8].[ext]'
                    }
                }]
            },
            //字体
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [{
                    loader:'file-loader',
                    options:{
                        name:'assets/fonts/[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    devServer: {
        open: true,//自动打开浏览器
        port: 9000,// 监听端口
        contentBase:'./src/common',
        // 服务器打包后资源的输出路径
        publicPath: "/"
    }
};