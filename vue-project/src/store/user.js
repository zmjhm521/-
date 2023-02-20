import { reqGetCode,reqUserRegister,reqUserLonin,reqUserInfo,reqLogout } from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";
export default {
    actions: {
        // 获取产品信息
        async getCode({ commit }, phone) {
            //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
            // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上
            let result = await reqGetCode(phone)
            if (result.code === 200) {
                commit("GETCODE", result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
        async userRegister({commit},{phone,code,password}){
            let result = await reqUserRegister({phone,code,password})
            if (result.code===200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户登录
        async userLogin({commit},{phone,password}){
            let result = await reqUserLonin({phone,password})
            // 服务器下发token,用户唯一标识符
            // 将来经常通过token找服务器要用户信息进行展示
            if (result.code===200) {
                // 用户已经登录成功并且获取到token
                commit('USERLOGIN',result.data.token)
                // 持久化存储token
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async getUserInfo({commit}){
            let result=await reqUserInfo()
            // console.log(result);
            if (result.code==200) {
                commit('USERINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户退出
        async logout({commit}){
            // 只是向服务器发起一次请求，通知服务器清楚token
            let result=await reqLogout()
            // action里面不能操作state，提交mutation修改state
            if (result.code===200) {
                commit('CLEAR')
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        GETCODE(state,code){
            state.code = code 
        },
        USERLOGIN(state,token){
            state.token = token
        },
        USERINFO(state,userInfo){
            state.userInfo = userInfo
        },
        CLEAR(state){
            // 仓库中用户信息清空
            state.token = ''
            state.userInfo={}
            // 本地存储清空
            removeToken()
        }
    },
    state: {
        code:'',
        token:getToken(),
        userInfo:{},
    },
    getters: {},
}