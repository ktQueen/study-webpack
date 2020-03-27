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
    // entry:'./src/script/index.js',
    // 2两个平行的，不相互依赖的文件，却想打包在一起
    // entry:['./src/script/index.js','./src/script/hello.js'],
    // 3多页面应用场景
    entry:{
        page1:'./src/script/index.js',
        page2:['./src/script/index.js','./src/script/hello.js']
    },

    // 出口文件
    output:{
        // 路径
        path:path.resolve(__dirname,'dist'),
        // 名称
        // hash每一次打包每个文件hash是一样的
        // chunkhash每次打包每个文件hash不一样，只要文件变了生成的hash就会修改，文件没有修改hash不做改动
        filename:'[name]-[chunkhash].js'
    },
    // loader,遇到什么文件先用什么loader转换一下
    module:{
        rules:[
            {
                test:/.\txt$/,
                use:'raw-loader'
            },
            {
                test:/.\css$/,
                //loader的执行顺序，从后往前
                loader:['style-loader','css-loader','postcss-loader'],
            }
        ]
    },
    // 插件
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'})
    ]
}
// module.exports是commonjs的模块化输出
module.exports=config;