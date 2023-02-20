import Vue from "vue";
import Vuex from 'vuex'
// 使用插件一次
Vue.use(Vuex)
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import cart from "./cart";
import user from './user';
import trade from './trade'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        cart,
        user,
        trade
    }
})