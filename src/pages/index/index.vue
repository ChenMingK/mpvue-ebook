<template>
  <div>
    <div class="home" v-if="isAuth">
      <SearchBar 
        :disabled="true"
        @click="onSearchBarClick"
        :hotSearch="hotSearch"
      /> <!-- 我们点击搜索框时做跳转，所以禁用其功能，hotSearch / hot-search 的形式都可以 -->
      <HomeCard 
        :data="homeCard"
        @onHomeCardBookClick="onHomeCardBookClick"
      />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="2020 届秋季校园招聘开始啦"
        subTitle="投递简历"
        @onClick="onBannerClick"
      />
      <div :style="{marginTop: '23px'}">
        <HomeBook  
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="col"
          btn-text="换一批"
          @onMoreClick="() => recommendChange('recommend')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook  
          title="免费阅读"
          :row="2"
          :col="2"
          :data="freeRead"
          mode="row"
          btn-text="换一批"
          @onMoreClick="() => recommendChange('freeRead')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook  
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="col"
          btn-text="换一批"
          @onMoreClick="() => recommendChange('hotBook')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook  
          title="分类"
          :row="2"
          :col="2"
          :data="category"
          mode="category"
          btn-text="查看全部"
          @onMoreClick="onCategoryMoreClick"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <!-- mpvue 直接在组件上定义样式不能生效? -->
    </div>
    <Auth v-if="!isAuth" @getUserInfo="init" />
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import Auth from '../../components/base/Auth'
  // eslint-disable-next-line no-unused-vars
  import {
    getHomeData,
    getRecommendData,
    getfreeReadData,
    getHotBookData,
    register
  } from '../../api'
  
  import {
    getSetting,
    getUserInfo,
    setStorageSync,
    getStorageSync,
    getUserOpenId,
    showLoading,
    hideLoading
  } from '../../api/wechat'

  export default {
    components: {
      SearchBar,
      HomeCard,
      HomeBanner,
      HomeBook,
      Auth
    },
    data () {
      return {
        hotSearch: '',
        // shelf: [], // 包含在 homeCard
        banner: {},
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: [],
        homeCard: {},
        isAuth: true // 默认是已授权，展示首页
      }
    },
    methods: {
      // 换一批功能实现
      recommendChange (key) {
        switch (key) {
          case 'recommend':
            getRecommendData().then(response => {
              this.recommend = response.data.data
            })
            break
          case 'freeRead':
            getfreeReadData().then(response => {
              this.freeRead = response.data.data
            })
            break
          case 'hotBook':
            getHotBookData().then(response => {
              this.hotBook = response.data.data
            })
            break
        }
      },
      onSearchBarClick () {
        //
      },
      onBannerClick () {
        console.log('click banner')
      },
      // 换一批功能实现
      onBookMoreClick () {
        //
      },
      onHomeBookClick () {
        console.log('onHomeBookClick')
      },
      onCategoryMoreClick () {

      },
      // 点击 HomeCard 组件中的图书时触发
      onHomeCardBookClick () {
        console.log('onHomeCardBookClick')
      },
      // 拉取首页数据
      getHomeData (openId, userInfo) {
        getHomeData({ openId }).then(response => {
          const {
            data: {
              hotSearch: {
                keyword
              },
              banner,
              recommend,
              freeRead,
              hotBook,
              category,
              shelf,
              shelfCount
            }
          } = response.data
          // console.log(keyword, shelf, banner, recommend, freeRead, hotBook, category)
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          }
          hideLoading() // 隐藏 loading 组件
        }).catch(() => {
          hideLoading()
        })
      },
      getUserInfo (e) {
        // 获取 openid 后的回调，作为参数传给 getUserOpenId
        const onOpenIdComplete = (openId, userInfo) => {
          this.getHomeData(openId, userInfo)
          register(openId, userInfo) // 用户后台注册
        }
        getUserInfo(
          (userInfo) => {
            console.log(userInfo)
            setStorageSync('userInfo', userInfo) // 同步
            const openId = getStorageSync('openId') // openId 唯一，缓存后方便后续操作
            if (!openId || openId.length === 0) {
              getUserOpenId(openId => onOpenIdComplete(openId, userInfo)) // 调用 wx.login 获取一个 code，再由该 code 获取用户 openId
              // console.log('请求 openId')
            } else {
              // do something after get openId
              onOpenIdComplete(openId, userInfo)
            }
          },
          () => {
            console.log('failed...') // 也可以抛出异常
          }
        )
      },
      // 调用小程序 API，判断小程序是否获得权限
      getSetting () {
        getSetting(
          'userInfo',
          () => {
            this.isAuth = true
            showLoading('正在加载') // 拉取数据的时候显示正在加载，数据拉取完成后异常 loading，另外注意是成功获取授权之后才显示
            this.getUserInfo() // getSetting 判断是否已经授权，授权成功的回调获取用户信息
          },
          () => {
            this.isAuth = false
          }
        )
      },
      init () {
        this.getSetting()
      }
    },
    mounted () {
      this.init() // 授权成功 -> 重新判断用户是否具有权限 -> 显示相应的面板 & 获取用户信息
    }
  }
</script>

<style lang="scss" scoped>

</style>
