<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(image, index) in skuImageList" :key="image.id">
        <img :src=image.imgUrl :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
// $nextTick
export default {
  name: "ImageList",
  data(){
    return {
      currentIndex:0
    }
  },
  props: ['skuImageList'],
  watch: {
    skuImageList: {
      immediate: true,
      handler(newValue, OldValue) {
        // 监听bannerList数据的变化
        // 如果执行handler方法，代表组件实例身上这个属性的属性值已经有了
        // 当前函数执行，只能保证bannerList数据已经有了，无法保证v-for已经执行结束
        // v-for执行完毕，才有结构
        this.$nextTick(() => {
          // var mySwiper = new Swiper(this.$refs.mySwiper, {
          var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', // 水平切换选项
            // 显示图片数量设置
            slidesPerView: 3,
            // 每次切换图片个数
            slidesPerGroup:1,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  },
  methods:{
    changeCurrentIndex(index){
      this.currentIndex = index
      // 通知兄弟元素，当前的索引值为几
      this.$bus.$emit('getIndex',this.currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>