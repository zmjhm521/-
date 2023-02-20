// //引入一级路由组件
// import Home from '@/pages/Home.vue'
// import Login from '../pages/Login.vue'
// import Register from '../pages/Register.vue'
// import Search from '../pages/Search.vue'
// import Detail from '@/pages/Detail.vue'
// import AddCartSuccess from '@/pages/AddCartSuccess.vue'
// import ShopCart from '@/pages/ShopCart.vue'
// import Trade from '@/pages/Trade.vue'
// import Pay from '@/pages/Pay.vue'
// import PaySuccess from '@/pages/PaySuccess.vue'
// import Center from '@/pages/Center.vue'
// // 引入二级路由组件
// import myOrder from '@/components/Center/myOrder.vue'
// import groupOrder from '@/components/Center/groupOrder.vue'

/*
路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */
// 路由配置信息
export default [

    {
        path: '/home',
        component: ()=>import('@/pages/Home.vue'),
        // 路由元信息
        meta: { show: true }
    },
    {
        path: '/login',
        name:'login',
        component: ()=>import('@/pages/Login.vue'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register.vue'),
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search.vue'),
        name: "search",
        // 路由组件传递props数据
        // 布尔值写法:只能传递params参数
        // props:true,
        // 对象写法额外的给路由组件传递一些props
        // props:{a:1,b:2},
        // 函数写法，可以将params参数、query参数，通过props传递给路由组件
        // props:($route)=>{
        //     return {keyword:$route.params.keyword,k:$route.query.k}
        // },
        meta: { show: true }
    },
    {
        path: '/detail/:skuid?',
        component: ()=>import('@/pages/Detail.vue'),
        name: 'detail',
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess.vue'),
        name: 'addcartsuccess',
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart.vue'),
        name: 'shopcart',
        meta: { show: true }
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade.vue'),
        name: 'trade',
        meta: { show: true }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay.vue'),
        name: 'pay',
        meta: { show: true }
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess.vue'),
        name: 'paysuccess',
        meta: { show: true }
    },
    {
        path: '/center',
        component: ()=>import('@/pages/Center.vue'),
        name: 'center',
        meta: { show: true },
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:()=>import('@/components/Center/myOrder.vue')
            },
            {
                path:'groupOrder',
                component:()=>import('@/components/Center/groupOrder.vue')
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向,项目启动时，立马定到首页
    {
        path: '*',
        redirect: '/home'
    }

]

