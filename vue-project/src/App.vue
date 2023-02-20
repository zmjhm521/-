<template>
  <div>
    <h1 v-upper.erha="msg">{{ msg }}</h1>
    <Header></Header>
    <router-link to="/home"></router-link>
    <!-- 路由组件的出口 -->
    <router-view></router-view>
    <!-- 在Home、Search是显示的，在登陆、注册时是隐藏的 -->
    <!-- <Footer v-show="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  data(){
    return{
      msg:"abc"
    }
  },
  components: { Header, Footer },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    // 激发一个action 获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
