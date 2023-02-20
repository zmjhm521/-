import { reqTradeInfo,reqAddressInfo,reqSubInfo } from "@/api";
export default {
    actions: {
        // 获取产品信息
        async getTradeInfo({ commit }) {
            //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
            // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上
            let result = await reqTradeInfo()
            if (result.code === 200) {
                commit("GETTRADEINFO", result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        async getAddressInfo({ commit }) {
            //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
            // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上
            let result = await reqAddressInfo()
            if (result.code === 200) {
                commit("GETADDRESSINFO", result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        async getSubInfo({commit},{tradeNo,data}){
            console.log(tradeNo,data);
            let result = await reqSubInfo(tradeNo,data)
            console.log(result);
        }
    },
    mutations: {
        GETTRADEINFO(state,tradeInfo){
            state.tradeInfo = tradeInfo
        },
        GETADDRESSINFO(state,addressInfo){
            state.addressInfo = addressInfo||{}
        },
    },
    state: {
        tradeInfo:{},
        addressInfo:[]
    },
    getters: {
        detailArrayList(state){
            return state.tradeInfo.detailArrayList ||[]
        },
        userAddressList(state){
            return state.tradeInfo.userAddressList ||[]
        },
        totalAmount(state){
            return state.tradeInfo.totalAmount ||''
        },
        totalNum(state){
            return state.tradeInfo.totalNum ||''
        },
        tradeNo(state){
            return state.tradeInfo.tradeNo ||''
        },
    },
}