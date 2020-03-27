// 操作文件路径模块
const path=require('path')
// 通过npm 安装这个插件
// require是commonjs的引用方法
const HtmlWebpackPlugin=require('html-webpack-plugin')
// 用于访问内置插件
const webpack=require('webpack')

const config={
    // 模式 production或development
    mode:'development',

    // 1入口文件，所有的文件从这个文件依赖
    entry:'./src2/app.js',

    // 出口文件
    output:{
        // 路径
        path:path.resolve(__dirname,'dist2'),
        // 名称
        // hash每一次打包每个文件hash是一样的
        // chunkhash每次打包每个文件hash不一样，只要文件变了生成的hash就会修改，文件没有修改hash不做改动
        filename:'js/[name].bundle.js',
    },
    // loader,遇到什么文件先用什么loader转换一下
    module:{
        rules:[
            {
                test:/\.js$/,
                //排除范围
                exclude: /(node_modules|bower_components)/,
                // include包含范围
                include:'',
                use:'babel-loader',
                //query可以放在webpack也可以放在package.json,也可以在根目录建文件.babelrc里面
                // query:{
                //     presets:["lastest"]
                // }
            }
        ]
    },
    // 插件
    plugins:[
        // 多页面就配置多个
        new HtmlWebpackPlugin({
            // 文件名
            filename:'index.html',
            // 模版
            template:'index.html',
            inject:'body'
        })
    ]
}
// module.exports是commonjs的模块化输出
module.exports=config;