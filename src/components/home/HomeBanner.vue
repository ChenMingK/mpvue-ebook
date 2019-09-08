<template>
  <div class="home-banner" @click="onClick">
    <div class="bg-img" :style="{backgroundImage: bgImage}"> <!-- 似乎不支持反引号写法 -->
      <div class="title">{{title}}</div>
      <div class="sub-title">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      subTitle: String,
      img: String
    },
    computed: {
      bgImage () {
        return 'url(' + this.img + ')' // 如果直接放在 DOM 结构中，初次加载时会是 undefined，导致报错
        // tip：样式绑定时尽量少使用字符串拼接，如果使用可以用计算属性解决 undefined 问题，为什么能解决呢？
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang='scss' scoped>
  .home-banner {
    margin-top: 20px;
    padding: 0 20px;
    .bg-img {
      height: 125px;
      border-radius: 10px;
      background-size: 100% 100%; // 让图片撑满容器
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 18px;
        font-weight: 500;
        color: #fff;
      }
      .sub-title {
        padding: 5px 15px;
        background: #4585ff;
        border: 1px solid #ccc;
        border-radius: 50px;
        margin-top: 10px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
</style>
