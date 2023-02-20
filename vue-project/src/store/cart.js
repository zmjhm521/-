import { reqCartList, deleteCartList, checkCart } from "@/api"

export default {
    actions: {
        // 获取产品信息
        async getCartList({ commit }) {
            //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
            let result = await reqCartList()
            if (result.code === 200) {
                commit("GETCARTLIST", result.data)
            }
        },
        // 删除购物车数据
        // context:小仓库，commit【提交mutation】getters【计算属性】dispatch【派发action】state【当前仓库数据】
        deleteAllCheckedCart({ dispatch, getters }) {
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuid', item.skuId) : ''
                PromiseAll.push(promise)
            });
            // 只要全部的p1\p2\p3都成功，返回结果即为成功，否则即为失败
            return Promise.all(PromiseAll)
        },
        async deleteCartList({ commit }, skuId) {
            //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
            let result = await deleteCartList(skuId)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        async checkCart({ commit }, { skuId, isChecked }) {
            let result = await checkCart(skuId, isChecked)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 修改全部产品的状态
        checkedAll({ dispatch, getters }, isChecked) {
            // 数组
            let promiseAll = []
            let arr = getters.getCartList.cartInfoList
            if (typeof arr != 'undefined') {
                getters.getCartList.cartInfoList.forEach(item => {
                    let promise = dispatch('checkCart', { skuId: item.skuId, isChecked })
                    promiseAll.push(promise)
                })
            }
            // 返回结果
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        GETCARTLIST(state, value) {
            state.getCartList = value
        },
    },
    state: {
        getCartList: [],
    },
    getters: {
        getCartList(state) {
            return state.getCartList[0] || {}
        },
    },
}