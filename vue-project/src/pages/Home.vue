<template>
    <div>
        <TypeNav></TypeNav>
        <List></List>
        <todayRecommend></todayRecommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :f="floor"></Floor>
        <Brand></Brand> 
    </div>
</template>

<script>
import List from '@/components/Home/List.vue'
import todayRecommend from '@/components/Home/todayRecommend.vue'
import Rank from '@/components/Home/Rank.vue'
import Like from '@/components/Home/Like.vue'
import Floor from '@/components/Home/Floor.vue'
import Brand from '@/components/Home/Brand.vue'
import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{List,todayRecommend,Rank,Like,Floor,Brand},
    mounted(){
        this.$store.dispatch('floorList')
    },
    computed:{
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            floorList: (state) => {
                return state.home.floorList
            }
        })
    }
}
</script>

<style lang="less" scoped>

</style>