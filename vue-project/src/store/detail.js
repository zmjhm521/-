import { reqGetDetail,reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid--->生成一个随机字符串（不能改变）
import {getUUID} from '@/utils/uuid_token'
export default {
    actions: {
        // 获取产品信息
        async getDetailList({ commit }, skuid) {
            //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
            let result = await reqGetDetail(skuid)
            if (result.code === 200) {
                commit("GETDETAILLIST", result.data)
            }
        },
        // 将产品添加到购物车中
        // 前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表本次操作成功
        // 不需要三连环存储数据
        async addOrUpdateShopCart({ commit }, {skuid,skuNum}){
            // 加入购物车返回的解构
            let result = await reqAddOrUpdateShopCart(skuid,skuNum)
            // console.log(result);
        //当前的这个函数如果执行返回Promise
        // return result
        if (result.code==200) {
            return 'ok'
        } else {
            // 代表加入购物车失败
            return 'faile'
        }
        }

    },
    mutations: {
        GETDETAILLIST(state, value) {
            state.detailList = value
        },
    },
    state: {
        detailList: {},
        // 游客临时身份
        uuid_token:getUUID()
    },
    getters: {
        categoryView(state) {
            return state.detailList.categoryView || {}
        },
        price(state) {
            return state.detailList.price || {}
        },
        price(state) {
            return state.detailList.price || {}
        },
        skuInfo(state) {
            return state.detailList.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailList.spuSaleAttrList || {}
        },
        valuesSkuJson(state) {
            return state.detailList.valuesSkuJson || {}
        },
    },
}