import Vue from 'vue'
import App from './App.vue'
// 引入仓库
import store from './store'
// 引入路由
import router from './router'
// 三级联动组件--全局组件
import TypeNav from '@/components/Home/TypeNav.vue'
import Carousel from '@/components/Carousel.vue'
import Pagination from '@/components/Pagination.vue'
import { Button, MessageBox } from 'element-ui';
// // 测试
// import {reqCategoryList} from '@/api'
// reqCategoryList();
// 注册全局组件
Vue.component(Button.name, Button);
Vue.component(TypeNav.name, TypeNav)
// 全局组件轮播图
Vue.component(Carousel.name, Carousel)
// 全局分页器组件
Vue.component(Pagination.name, Pagination)
// 引入MockServe.js----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"
// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 统一接受api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
import kjys from '@/assets/images/1.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: kjys
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
// 注册自定义插件
Vue.use(myPlugins,{
  name:'upper'
})
// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  // 注册路由，KV一致省略V（router小写）
  router: router,
  // 注册仓库
  store,
}).$mount('#app')
