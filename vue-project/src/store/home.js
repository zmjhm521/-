import { reqCategoryList, reqGetBanner,reqGetfloor } from "@/api"
// // action:处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {

// }
// // mutations:修改state的唯一手段
// const mutations = {

// }
// // state:仓库存储数据的地方
// const state = {
//     // state中的数据默认初始值别瞎写，和服务器【接口】返回的数据类型保持一致

// }
// // getters:理解为计算数据，用于简化仓库数据，让组件获取仓库的数据更方便
// const getters = {}
// console.log(state.categoryList);
// 对外暴露Store类的一个实例
export default {
	// namespaced:true,
	actions: {
		async categoryList({ commit }) {
			//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
			let result = await reqCategoryList()
			if (result.code === 200) {
				commit("CATEGORYLIST", result.data)
			}
		},
		// 获取首页轮播图的数据
		async bannerList({ commit }) {
			//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
			let result = await reqGetBanner()
			if (result.code === 200) {
				commit("BANNERLIST", result.data)
			}
		},
		// 获取首页楼层数据
		async floorList({ commit }) {
			//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
			let result = await reqGetfloor()
			if (result.code === 200) {
				commit("FLOORLIST", result.data)
			}
		},
	},
	mutations: {
		CATEGORYLIST(state, value) {
			state.categoryList = value
		},
		BANNERLIST(state, value) {
			state.bannerList = value
		},
		FLOORLIST(state, value) {
			state.floorList = value
		},
	},
	state: {
		categoryList: [],
		bannerList: [],
		floorList:[],
	},
	getters: {

	},
}