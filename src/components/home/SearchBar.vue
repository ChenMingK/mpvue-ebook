<template>
  <div class="search-bar">
    <div class="search-bar-wrapper">
      <van-icon 
        class="search"
        name="search"
        size="16px"
        color="#858C96"
      ></van-icon>
      <input 
        class="search-bar-input"
      /> <!-- 我们编写的 input 会被转换为小程序的组件，且会建立属性映射 -->
      <van-icon 
        class="clear"
        name="clear"
        size="16px"
        color="#858C96"
      ></van-icon> <!-- vant-icon 组件库 -->
    </div>
  </div>
</template>

<!-- tip: mpvue 写一个新的组件需要重新 npm run dev -->
<script>
  import SearchBar from '../../components/home/SearchBar'
  export default {
    components: {
      SearchBar
    }
  }
</script>

<style lang='scss' scoped>
  .search-bar {
    padding: 15px 15.5px; // 设备独立像素，mpvue 会将 px 转换为乘2的 rpx 单位
    .search-bar-wrapper {
      display: flex;
      align-items: center;
      background: #F5F7F9;
      border-radius: 20px;
      padding: 12px 17px;
      height: 40px;
      box-sizing: border-box;
      .search-bar-input {
        flex: 1;
        margin: 0 8px;
      }
      .search, .clear{
        display: flex;
        align-items: center;
        height: 100%; // 让图标垂直居中
      }
    }
  }
</style>
