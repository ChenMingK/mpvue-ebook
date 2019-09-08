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
        :focus="focus"
        :disabled="disabled"
        :maxlength="limit"
        :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch"
        v-model="searchWord"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
        @click="onSearchBarClick"
        placeholder-style="color: #ADB4BE"
      /> <!-- 我们编写的 input 会被转换为小程序的组件，且会建立属性映射 -->
      <!-- 
        confirm-type = search 表示手机弹出的键盘右下角按钮为 "搜索"
        confirm -> bindconfirm 注意 mpvue 有时候与小程序文档的不一致
        placeholder-style = "String" 指定 placeholder 的样式
       -->
      <van-icon 
        class="clear"
        name="clear"
        size="16px"
        color="#858C96"
        @click="onClearClick"
        v-if="searchWord.length > 0"
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
    },
    // 通过 props 定制该组件的搜索框功能
    props: {
      // 搜索框是否获得焦点，focus 属性是小程序 input 组件独有的而不是 web 原生
      focus: {
        type: Boolean,
        default: false // 指定为 false 会发现，输入文字会马上失去焦点，需要 fix
      },
      // 是否禁用搜索框
      disabled: {
        type: Boolean,
        default: false
      },
      // 输入的最大长度，对应小程序 input 组件的 maxlenght
      limit: {
        type: Number,
        default: 50
      },
      // 热门搜索词
      hotSearch: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        searchWord: ''
      }
    },
    methods: {
      // 搜索框点击事件
      onSearchBarClick () {
        this.$emit('onClick')
      },
      // 点击清空按钮触发
      onClearClick () {
        this.searchWord = ''
        this.$emit('onClear')
      },
      // 输入监听事件
      onChange (e) {
        const { value } = e.mp.detail
        this.$emit('onChange', value) // 自身不处理，交由父组件处理
      },
      // 点击虚拟键盘搜索事件
      onConfirm (e) {
        const { value } = e.mp.detail
        this.$emit('onConfirm', value)
      },
      setValue (v) {
        this.searchWord = v
      },
      getValue (v) {
        return this.searchWord
      }
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
