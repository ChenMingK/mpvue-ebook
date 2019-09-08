<!--
  图片组件，可复用性强，作为基础组件；
  提供懒加载，设置 loading 效果等功能
-->

<template>
  <div class="image-view" @click="onClick">
    <img 
      :class="round ? 'round image' : 'image' "
      :style="{ height }"
      :src="src"
      :mode="mode"
      :lazy-load="lazyload"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error"
    />
    <!--
      mpvue-loader 会将 <img> 转换为小程序的 <image>
      小程序文档使用的是 binderror 和 bindload
    -->
    <img 
      :class="round ? 'round image' : 'image' "
      :style="{ height }"
      src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
      :mode="mode"
      :lazy-load="lazyload"
      @load="onLoad"
      @error="onError"
      v-show="isLoading || error"
    />
    <!-- 
      占位符图片
    -->
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        defualt: ''
      },
      mode: {
        type: String,
        default: 'widthFix' // 宽度自适应(小程序)
      },
      lazyLoad: { // 懒加载
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      height: { // 图片高度
        type: String,
        default: 'auto' // 默认模式下，宽高自适应
      }
    },
    watch: {
      // 监听 src 变化，如果 src 变化，则将 isLoading 置为 true
      src (newValue, preValue) {

      }
    },
    data () {
      return {
        isLoading: true, // 图片是否处于加载状态
        error: false // 地址是否错误
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      },
      // 图片加载成功时的回调
      onLoad () {
        this.isLoading = false
        this.error = false
      },
      // 加载失败的回调
      onError () {
        this.error = true
        this.isLoading = false
      }
    }
  }
</script>

<style lang='scss' scoped>
  .image-view {
    width: 100%;
    .image {
      width: 100%;
      &.round {
        border-radius: 50%;
      }
    }
  }
</style>
