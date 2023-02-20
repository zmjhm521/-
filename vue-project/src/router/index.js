// 该文件专门用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
// 使用插件
Vue.use(VueRouter)
import routes from './routes';
// 先把VueRouter原型对象的push方法，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push、replace
// 第一个参数，告诉原来push方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数的this一次
        // 不同点call与apply传递参数，call用逗号隔开，apply传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // call apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数的this一次
        // 不同点call与apply传递参数，call用逗号隔开，apply传递数组
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//创建并暴露一个路由器
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到最顶部
        return { y: 0 }
    }
})

// 全局守卫，前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取到要跳转到哪个路由
    // form:可以获取从哪个路由来的信息
    // next:放行函数 next() next(path)放行到指定路由 next(false)
    // 用户登录了，才会有token，未登录一定不会有token
    // next()
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.naem
    if (token) {
        // 用户已经登录了，还想去login和register
        if (to.path == '/login'||to.path=='/register') {
            next('/home')
        } else {
            // 登录了，没去login和register
            // 如果用户名已有
            if (name) {
                next()
            // 没有用户信息
            } else {
                // 获取用户信息，派发action让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    // 放行
                    next()
                } catch (error) {
                    // token失效
                    // 清除token
                    await store.dispatch('logout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录不能去交易相关的，支付相关的以及用户中心
        // string.indexOf('1')=-1为string中不包含1
        let toPath = to.path
        if(to.path=='/trade'||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1){
            // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath)
        }else{
           next() 
        }
    }
})

export default router;
