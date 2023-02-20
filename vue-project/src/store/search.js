import { reqGetList } from "@/api"
// state:仓库存储数据的地方
const state = {
    list:{}
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据
    async searchList({commit},params={}){
        // params形参，是当用户派发action时，第二个参数传递过来的，至少是一个空对象
       let result = await reqGetList(params)
       if (result.code === 200) {
        commit("SEARCHLIST", result.data)
    }
    }
}
// mutations:修改state的唯一手段
const mutations = {
    SEARCHLIST(state,value){
        state.list = value
    }
}
// getters:理解为计算数据，用于简化仓库数据，让组件获取仓库的数据更方便
// 计算属性，在项目中，为了简化数据而生
// 假如网络不给力，计算新的属性值为undefined
const getters = {
    goodsList(state){
        return state.list.goodsList || []
    },
    trademarkList(){
        return state.list.trademarkList|| []
    },
    attrsList(){
        return state.list.attrsList|| []
    }
}
// 对外暴露Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})