import  Vue from 'vue'
import  App from  './app.vue'

import './style/style.css'
import './assets/123.jpeg'
import './style/test-stylus.styl'

// 创建一个根元素
const root=document.createElement('div')
document.body.appendChild(root);

const vm=new Vue({
    // h就是vue里面的createElement函数
    render:(h)=>{
        return h(App);
    }
})

vm.$mount(root)
