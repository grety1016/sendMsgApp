//导入VUE
import { createApp } from 'vue'

//引入APP组件
import App from '@/App.vue'

//引入Vant组件库及样式 
import 'amfe-flexible'//用于移动端的响应式布局，配合postcss-pxtorem使用

//引入路由
import { router } from '@/router'

//引入Pinia
import { pinia } from '@/stores'
//自定义图标
import '@/assets/icon/iconfont.css'
//引入本地自定义组件用于全局
import '@/components/CustomIcon.vue'







createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')