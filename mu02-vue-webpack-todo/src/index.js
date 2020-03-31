import  Vue from 'vue'
import  App from  './app.vue'

// 创建一个根元素
const root=document.createElement('div')
document.body.appendChild(root);

new Vue({
    // h就是vue里面的createElement函数
    render:(h)=>h(App)
}).$mount(root)
