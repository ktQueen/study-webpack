
const path=require('path');
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
// 在head头引入单独的css文件
const ExtractPlugin=require('extract-text-webpack-plugin');

// 判断环境
const isDev=process.env.NODE_ENV==='development'

let config={
    target:'web',
    // 入口文件
    //当前的目录地址和后面写的路径拼接起来形成一个绝对路径
    entry:path.join(__dirname,'src/main.js'),
    // 出口
    output:{
        // 开发环境不能使用chuckhash，不然会报错，线上环境使用chunkhash
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: ['vue-loader', 'vue-style-loader' ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.jsx/,
                use:['babel-loader']
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[{
                    // 把我们的图片转成base64代码,直接写在js里面，而不用生成一个新的文件
                    // 对于小图片作用很大，他可以减少我们的http请求
                    // url-loader封装了一下file-loader
                    //file-loader就是读取一下图片进行一些简单的操作，再把这个文件换个名字换个地方，存在另一个地方
                    // url-loader做了图片在1024以下他就会转译成base64代码
                    loader:'url-loader',
                    options:{
                        limit:1024,
                        // name 文件的名字
                        // ext 文件的扩展名
                        name:'[name]-aaa.[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // webpack 判断环境，在这里定义了，在我们的js代码中是可以引用到的
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        // html插件
        new HTMLPlugin()
    ]
};

if(isDev){
    config.module.rules.push({
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            // 使用前面的sourceMap，这样编译可以快一点
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    });
    // 帮助我们在页面调试代码的，因为vue代码都是编译过得，根本看不懂
    // 这个时候用一个sourcemap去映射比较好快速去定位我们的错误
    config.devtool='#cheap-module-eval-source-map'
    config.devServer={
        port:'8000',
        // 使用0.0.0.0，可以用127.0.0.1访问，也可以用内网ip进行访问
        // 如果设置成localhost，那么用我们的ip访问不了
        //通过ip访问的好处：
        //  别人的电脑也可以访问我们的电脑；
        //  或者我们手机调试的时候，可以用手机链接我们的电脑
        host:'0.0.0.0',
        // 在我们编译中如果有任何的错误都让他显示在网页上,可以很快定位错误
        overlay:{
            errors:true
        },
        // 我们改了一个组件的代码，我们只渲染当前这个组件的效果，不让整个页面都重新加载
        hot:true,
        // // 把没有做映射的地址都映射到我们的入口
        // historyFallback:{
        //
        // },
        // // 启动devserver自动帮我们打开浏览器
        // open:true
    }
    config.plugins.push(
        // hot功能的plugin
        new webpack.HotModuleReplacementPlugin(),
        // 减少一些不需要的信息展示
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    /* 单独打包类库文件vue，
     为什么要单独打包，因为这一类代码的稳定性比较高，业务代码要经常更新迭代
     我们希望浏览器去尽可能长的无缓存我们的静态文件
     如果把类库文件和业务文件都打包在一起，那么我们整个类库代码都要跟着业务代码去更新
     这样类库代码就不能很长时间在浏览器中缓存
     这个entry会单独打包一个文件叫vendor.js
     */
    config.entry={
        entry:path.join(__dirname,'src/main.js'),
        vendor:['vue']
    }
    // 线上文件hash用chunkhash
    /*
    * hash和chunkhash的区别
    * hash打包出来的模块都是同样的一个hash,他是整个应用的hash
    *chunk可以理解为entry申明的不同的节点，每个异步加载的模块也是一个chunk
    * chunk会单独生成一个hash,他的hash就会有区别,不然我们hash就没有意义，所以线上一定要使用chunkhash
    * */
    config.output.filename='[name].[chunkhash:8].js'
    //线上的css用在head引入标签的方式
    config.module.rules.push({
        test:/\.styl/,
        use:ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                // 使用前面的sourceMap，这样编译可以快一点
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            // name一定要相等，不然是识别不了的
            name:'vendor'
        }),
        // 把webpack相关的文件代码打包到一个文件里面
        new webpack.optimize.CommonsChunkPlugin({
            /* 我们在entry没有声明过的一个名字，一般会申明他是runtime
             把webpack生成在我们app.js的webpack相关的一些代码，给他单独的打包到一个文件里面
             这样的好处，当我们有新的模块的时候，webpack是会给新的模块加一个id上去，如果把这个模块放在中间，会导致后面的模块id发生变化
             他的内容，他的hash会产生一定的变化，hash想要享受浏览器长缓存的就失去了效果
             使用这个方法就可以规避这个问题
             cvendor一定要放在runtime前面，不然的话就会失去对应的作用
            */
            name:'runtime'
        })
    )
}

module.exports=config
