<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';

export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            immediate: true,
            handler(newValue, OldValue) {
                // 监听bannerList数据的变化
                // 如果执行handler方法，代表组件实例身上这个属性的属性值已经有了
                // 当前函数执行，只能保证bannerList数据已经有了，无法保证v-for已经执行结束
                // v-for执行完毕，才有结构
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.mySwiper, {
                        // var mySwiper = new Swiper('.swiper-container', {
                        direction: 'horizontal', // 垂直切换选项
                        loop: true, // 循环模式选项
                        autoplay: true,
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    }
}
</script>

<style scoped>

</style>