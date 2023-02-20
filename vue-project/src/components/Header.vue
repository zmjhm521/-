<template>
    <div>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <!-- 声明式导航，必须要有to属性 -->
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <a>{{ userName }}</a>
                            <a class="register" @click="logout">退出</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
                            搜索
                        </button>
                    </form>
                </div>
            </div>
        </header>
    </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    computed:{
        // 用户名信息
        ...mapState({
            userName:(state)=>{
                return state.user.userInfo.name
            }
        })
    },
    methods: {
        // 搜索按钮的回调函数，需要向serch路由进行跳转
        goSearch() {
            // 路由传递参数
            // 第一种字符串形式
            // this.$router.push('/search/'+ this.keyword +"?k="+this.keyword.toUpperCase())
            // 第二种模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种对象（常用需要命名）
            // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
            // 路由跳转传参的时候，对象的写法可以是name、path形式，但需要注意的是，path这种写法不能与params参数一起使用
            // 如果路由要求传递params参数，但是如果不传递params，URL会有问题
            // 如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号就可以解决该问题
            // this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}})
            // 使用undefined解决，params参数可以传递、不传递（空的字符串）
            // this.$router.push({name:'search',params:{keyword:''|| undefined},query:{k:this.keyword.toUpperCase()}})
            // 路由组件可以传递props数据有三种写法
            // 通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决（治标不治本）
            if (this.$route.query) {
                let location = { name: "search", params: { keyword: this.keyword || undefined } }
                location.query = this.$route.query
                this.$router.push(location)
            }
        },
        // 退出登录
        async logout(){
            // 发送请求，通知服务器退出登录，token
            // 清楚项目当中的数据【userInfo、token】
            try {
                await this.$store.dispatch('logout')
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
            
        }
    },
    mounted() {
        // 通过全局事件总线清除关键字
        this.$bus.$on("clear", () => {
            this.keyword = ''
        })
    }
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style> 