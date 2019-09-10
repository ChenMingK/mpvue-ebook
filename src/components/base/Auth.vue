<!-- 授权组件 -->
<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-info">
        <div class="auth-img">
          <ImageView 
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            height="100%"
            mode="scaleToFill"
            round
          /> <!-- 通过指定高度和 scaleToFill 的形式来保证占位图与要显示的图片宽高一致 -->
        </div>
        <div class="sub-title">登录小慕读书</div>
        <div class="title">全场好书免费读</div>
      </div>
      <button 
        class="auth-btn"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      >
        授权登录
      </button>
    </div>
  </div>
</template>

<script>
  import ImageView from './ImageView'
  export default {
    components: {
      ImageView
    },
    methods: {
      getUserInfo () {
        this.$emit('getUserInfo')
      }
    }
  }
</script>

<style lang='scss' scoped>
  .auth-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #999;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    .auth {
      width: 270px;
      height: 248px;
      background: #f5f5f5;
      border-radius: 18px;
      position: relative;
      .auth-info {
        margin-top: 22.5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .auth-img {
          width: 74px;
          height: 74px;
        }
        .sub-title {
          font-size: 13px;
          color: #999;
          line-height: 18.5px;
          margin-top: 18px;
        }
        .title {
          font-size: 16px;
          color: #333;
          line-height: 22.5px;
          font-weight: 400;
          margin-top: 3.5px;
        }
      }
      .auth-btn {
        position: absolute;
        width: 100%;
        bottom: 0;
        background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
        border-radius: 0 0 18px 18px;
        font-size: 15px;
        color: #fff;
        height: 49px;
        line-height: 49px;
      }
    }
  }
</style>
