// 档期那模块对API进行统一管理

import requests from "./request";
import mockRequsets from "./mockAjax";
// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数
// 发请求,axios请求返回结果是Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner（home首页轮播图接口）
export const reqGetBanner = () => mockRequsets.get("/banner")
// console.log(reqGetBanner());
// 获取floor(floor首页楼层接口)
export const reqGetfloor = () => mockRequsets.get("/floor")
// 获取search页面数据
// 需要传递参数,当前接口给服务器传递的是params,至少是一个空对象
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数「至少是一个空对象」
export const reqGetList = (params) => requests({ url: '/list', method: 'post',data:params })
// 获取detail页面数据
export const reqGetDetail = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({ url: `/cart/addToCart/${ skuId }/${ skuNum }`, method: 'post' })
// 获取购物车列表数据接口
export const reqCartList = ()=> requests.get('/cart/cartList')
// 删除购车中指定数据
export const deleteCartList = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 切换购物车商品状态
export const checkCart = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取注册验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 完成注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',method:'post',data})
// 完成登录
export const reqUserLonin = (data)=>requests({url:'/user/passport/login',method:'post',data})
// 获取用户信息【需要带着用户的token向服务器要信息】/user/passport/auth/getUserInfo
export const reqUserInfo =()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})
// 获取交易界面信息
export const reqTradeInfo = ()=>requests({url:'/order/auth/trade',method:'get'})
// 获取用户地址信息 13700000000 111111
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 提交信息
export const reqSubInfo=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 订单知乎信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 获取支付订单状态
export const reqPayOrder =(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取个人中心的数据
export const reqPersonOrder =(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})
