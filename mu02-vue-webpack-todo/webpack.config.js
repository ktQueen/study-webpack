
const path=require('path');

module.exports={
    // 入口文件
    //当前的目录地址和后面写的路径拼接起来形成一个绝对路径
    entry:path.join(__dirname,'src/index.js'),
    // 出口
    output:{
        filename:'bundle.js',
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
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[{
                    // 把我们的图片转成base64代码
                    loader:'url-loader',
                    options:{
                        limit:1024
                    }
                }]
            }
        ]
    },
    plugins: [
    ]
};
