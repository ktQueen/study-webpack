// 操作文件路径模块
const path=require('path')
// 通过npm 安装这个插件
// require是commonjs的引用方法
const HtmlWebpackPlugin=require('html-webpack-plugin')
// 用于访问内置插件
const webpack=require('webpack')

const config={
    context:__dirname,
    // 模式 production或development
    mode:'development',

    // 1入口文件，所有的文件从这个文件依赖
    // entry:'./src/script/index.js',
    // 2两个平行的，不相互依赖的文件，却想打包在一起
    // entry:['./src/script/index.js','./src/script/hello.js'],
    // 3多页面应用场景
    entry:{
        page1:'./src/script/index.js',
        page2:['./src/script/hello1.js'],
        page3:'./src/app.js'
    },

    // 出口文件
    output:{
        // 路径
        path:path.resolve(__dirname,'dist'),
        // 名称
        // hash每一次打包每个文件hash是一样的
        // chunkhash每次打包每个文件hash不一样，只要文件变了生成的hash就会修改，文件没有修改hash不做改动
        filename:'js/[name].bundle.js',
        // 占位符，你在html引用后的js路径，上线后就会用这个字符替换为这个开头的一个路径
        // publicPath:'http://www.com'
    },
    // loader,遇到什么文件先用什么loader转换一下
    module:{
        rules:[
            {
                test:/\.js$/,
                // 排除范围
                exclude: path.resolve(__dirname,'node_modules'),
                // include包含范围
                include:[path.resolve(__dirname,'src')],
                use:'babel-loader',
                //query可以放在webpack也可以放在package.json,也可以在根目录建文件.babelrc里面
                // query:{
                //     presets:["lastest"]
                // }
            },
            {
                test:/\.txt$/,
                use:'raw-loader'
            },
            {
                test:/\.html$/,
                use:'html-loader'
            },
            {
                test:/\.tpl$/,
                use:'ejs-loader'
            },
            {
                test:/\.css$/,
                //loader的执行顺序，从后往前
                // loader:'style-loader!css-loader!postcss-loader',
                use: [
                    'style-loader', 
                    {
                        loader:'css-loader',
                        options:{
                            // 处理引入进来的css文件
                            //importLoaders默认是0，意思是一个加载器都不用，
                            // 1:用postcss-loader加载器处理，
                            // 2:用postcss-loaders和sass-loader加载器处理
                            importLoaders:1
                        }
                    },
                    { 
                        loader: "postcss-loader",
                        options: { 
                            plugins: [ 
                             require("autoprefixer")({ 
                                 browsers: ['last 5 versions'] 
                                }) 
                            ]
                         }
                    }
                    ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: [
                                        "last 10 version"
                                    ]
                                }),
                            ],
                        }
                    }, {
                        loader: "less-loader", options: {
                            sourceMap: true
                        }// compiles Less to CSS
                    }]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: [
                                        "last 10 version"
                                    ]
                                }),
                            ],
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }// compiles Less to CSS
                    }]
            },
            {
                test:/\.(png|jpeg|gif|jpg)$/i,
                use:[
                    {
                        // loader: "file-loader",
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                            name: 'images/[name]-[hash:5].[ext]'
                        }
                    },
                    // 图片压缩
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true,
                        }
                    }
                ]
            },
            
        ]
    },
    // postcss:[
    //     // commonjs的用法
    //     require('autoprefixer')({
    //         browsers:['last 5 versions']
    //     })
    // ],
   // 插件
   plugins:[
    // 多页面就配置多个
    new HtmlWebpackPlugin({
        // 文件名
        // filename:'index-[hash].html',
        filename:'index.html',
        // 模版
        template:'index.html',
        // 脚本放在头部还是body
        // inject:'head',
        // inject:false,
        // 传参在模版中引用
        title:'123213',
        date:new Date(),
        // html文件压缩
        minify:{
            // 删除注释
            removeComments:true,
            // 删除空格
            collapseWhitespace:true
        },
        // 包含的chunk
        chunks:['page1','page2'],
        //排除chunk,其他的会被加载进来
        excludeChunks:[]
    }),
    new HtmlWebpackPlugin({
        filename:'index11.html',
        template:'index.html',
        inject:'head',
        title:'大大',
        chunks:['page2']
    }),
    new HtmlWebpackPlugin({
        filename:'index22.html',
        template:'index.html',
        inject:'body',
        title:'大房贷首付大',
        chunks:['page3']
    })
]
}
// module.exports是commonjs的模块化输出
module.exports=config;
