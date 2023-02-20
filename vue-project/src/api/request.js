// 对axios进行二次封装
import axios from "axios";
// 引入进度条插件
import nProgress from "nprogress";
// 在当前模块中引入store
import store from "@/store";
// start:进度条开始，done进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"
// 1.利用axios对象的方法create,去创建一个axios实例
// 2.request就是axios，可以稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径中会出现api
    baseURL: "/api",
    timeout: 5000,
});
// 请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 进度条开始动
    if (store.state.detail.uuid_token) {
        // 给请求头添加一个字段(userTempId)，和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nProgress.start();
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后响应拦截器可以检测到，可以做一事情
    // 进度条结束
    
    nProgress.done()
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return console.log(error);
})


// 对外暴露
export default requests