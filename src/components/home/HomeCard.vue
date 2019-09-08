<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wrapper">
          <ImageView 
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            round
          />
        </div>
        <div class="nickname">{{'米老鼠'}}</div>
        <div class="shelf-text">书架共有{{3}}本好书</div>
        <div class="round-item"></div> <!-- 文字的点 -->
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div class="book-img-wrapper">
            <ImageView 
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
            />
          </div>
          <div class="book-img-wrapper">
            <ImageView 
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
            />
          </div>
          <div class="book-img-wrapper">
            <ImageView 
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
            />
          </div>
        </div>
        <div class="shelf-wrapper">
          <div class="shelf">书架</div>
          <van-icon
            class="arrow" 
            name="arrow" 
            size="11px"
            color="#828489"
            ></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">反馈</div>
      <!-- 反馈标签 -->
      <van-dialog id="van-dialog"></van-dialog>
      <!-- 注意使用 Dialog 组件需要添加节点 -->
    </div>
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  import Dialog from 'vant-weapp/dist/dialog/dialog' // vant-weapp Dialog 组件
  export default {
    components: {
      ImageView
    },
    props: {
      data: Object,
      hasSign: {
        type: Boolean,
        default: false
      },
      signDay: {
        type: Number,
        default: 0
      }
    },
    methods: {
      gotoShelf () {

      },
      onBookClick () {

      },
      sign () {

      },
      onFeedBackClick () {
        Dialog.confirm({
          title: '反馈',
          message: '您是否确认提交反馈信息？',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          console.log('点击是之后的事件')
        }).catch(() => {
          console.log('点击否之后的事件')
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .home-card {
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 22px 20px 0;
    .home-card-inner {
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;
      position: relative;
      .user-info {
        display: flex;
        align-items: center;
        .avatar-wrapper {
          width: 20px;
          height: 20px;
        }
        .nickname, .shelf-text {
          font-size: 12px;
          color: #fff;; 
        }
        .nickname {
          margin: 0 8.5px;
        }
        .shelf-text {
          opacity: .7;
        }
        .round-item {
          width: 4px;
          height: 4px;
          background: #a2a2a2;
          border-radius: 50%;
          margin: 0 8px;
        }
      }
      .book-info {
        display: flex;
        .book-wrapper {
          display: flex;
          flex: 1;
          justify-content: space-around;
          margin-top: 16.5px;
          .book-img-wrapper {
            width: 72px;
            height: 101px;
          }
        }
        .shelf-wrapper {
          display: flex;
          align-items: center;
          .shelf {
            width: 11px; // 文字换行设置
            font-size: 11px;
            word-break: break-word;
            color: #fff;
            opacity: .8;
          }
          .arrow {
            
          }
        }
      }
      .feedback-wrapper {
        position: absolute;
        right: 0;
        top: 19.5px;;
        border-radius: 100px 0 0 100px;
        width: 44.5px;
        height: 23.5px;
        line-height: 23.5px;
        text-align: center;
        background: #707070; // 渲染问题，要让背景透明同时文字不透明 -> 方案1： 找近似背景取消 opacity； 方案2：文字处于另一个 div 再做绝对定位
        font-size: 11px;
        color: #fff;
      }
    }
  }
</style>
