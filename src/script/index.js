import bar from './bar'
//require('文件')是commonjs的写法

// 引入文件前先转一下
// 过于繁琐，每次引入css都需要这样
require('style-loader!css-loader!../style/style.css')
// require('../style/style.css')
bar()