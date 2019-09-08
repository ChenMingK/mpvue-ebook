<template>
  <div class="home-book">
    <div class="home-book-header">{{title}}</div>
    <div class="home-book-content">
      <div class="home-book-row" v-for="(item, index) in bookData" :key="index">
        <div class="home-book-col" 
          v-for="(book, bookIndex) in item" 
          :key="bookIndex"
          :style="{flex: '0 0 ' + (100 / col) + '%'}"  
        > <!-- 自动计算 flex-basis -->
          <div 
            class="book-wrapper"
            :style="{flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row'}"
            @click="onBookClick"
            v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW"
          >
            <ImageView :src="book.cover" />
            <div class="book-title-wrapper book-title-col" v-if="mode === HOME_BOOK_MODE.COL">
              <div class="book-title">{{book.title}}</div>
            </div> <!-- 标题分为几种布局形式，这是垂直布局 -->
            <div class="book-title-wrapper book-title-row" v-else>
              <div class="book-title">{{book.title}}</div>
              <div class="book-title-author-wrapper">
                <div class="book-author">{{book.author}}</div>
                <div class="book-category">{{book.categoryText}}</div>
              </div>
            </div> <!-- 标题分为几种布局形式，这是两栏布局，即 cover 和 title 分左右两栏 -->
          </div>

          <div class="category-wrapper" v-else>
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div><!-- 第三种布局，图书分类 -->
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn" @click="onMoreClick">
      <van-button round custom-class="home-book-btn">{{btnText}}</van-button>
    </div> <!-- 添加自定义的 class -->
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  import { HOME_BOOK_MODE, CATEGORY } from '@/utils/const'
  export default {
    components: {
      ImageView
    },
    props: {
      // 标题
      title: String,
      // 图书列表
      data: {
        type: Array,
        default: []
      },
      // 按钮文本
      btnText: String,
      // 行数
      row: {
        type: Number,
        default: 0
      },
      // 列数
      col: {
        type: Number,
        default: 1
      },
      // 显示模式: row 按行显示, col 按列显示, category 分类显示
      mode: {
        type: String,
        default: HOME_BOOK_MODE.ROW // 维护在 utils/const.js
      },
      // 是否显示标题
      showTitle: {
        type: Boolean,
        default: true
      },
      // 是否显示按钮
      showBtn: {
        type: Boolean,
        default: true
      },
      // 背景是否显示
      linearBg: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      HOME_BOOK_MODE () {
        return HOME_BOOK_MODE // 引入常量无法直接在 {{}} 中使用，需要做状态转换
      },
      bookData () { // 通过传入的行数和列数，将图书数据转换为二维数组
        const { data, row, col } = this
        if (data && data.length > 0) {
          data.forEach(book => {
            book.text = CATEGORY[book.categoryText.toLowerCase()]
          }) // 取到分类对应的中文名称
          const number = row * col // 我们需要展示的图书的数量
          const _bookData = data.slice(0, number) // 只截取需要展示的图书数量
          const _bookDataRow = []
          let _row = 0
          while (_row < row) {
            // 0 * 2 = 0, 2
            _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
            _row++
          }
          /*
            [
              [book1, book2],
              [book3, book4]
            ]
          */
          return _bookDataRow
        } else {
          return []
        }
      }
    },
    methods: {
      onMoreClick () { this.$emit('onMoreClick') },
      onBookClick () { this.$emit('onBookClick') }
    },
    mounted () {
      console.log(this.bookData)
    }
  }
</script>

<style lang='scss' scoped>
  .home-book {
    .home-book-header {
      padding: 13px 0 0 20.5px;
    }
    .home-book-content {
      padding: 0 12px;
      margin-top: 10.5px;
      .home-book-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-top: 12px;
        .home-book-col {
          padding: 0 8px;
          box-sizing: border-box;
          .book-wrapper {
            display: flex;
            .book-title-wrapper {
              &.book-title-col {

              }
              .book-title {
                font-size: 12px;
                color: #212731;
                line-height: 16.5px;
                max-height: 33px;
                font-weight: 500;
                overflow: hidden;
                word-break: break-all; // 单词溢出时换行，否则可能溢出宽度
              }
              &.book-title-row {
                flex: 0 0 50%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .book-title {
                  font-size: 14px;
                  color: #1F1F1F;
                  line-height: 18px;
                  max-height: 36px;
                  overflow: hidden;
                  word-break: break-all; // 单词溢出时换行，否则可能溢出宽度
                }
                .book-author, .book-category {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px; // 只显示 1 行
                  overflow: hidden;
                  word-break: break-word;
                }
              }
            }
          }
          .category-wrapper {
            position: relative;
            display: flex;
            background: #F8F9FB;
            border-radius: 10px;
            height: 96px;
            padding: 13px 0 14.5px 16px;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: space-between;
            .category-text {
              font-size: 16px;
              line-height: 22.5px;
              color: #212832;
              width: 150px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .category-num {
              color: #868686;
              font-size: 12px;
              line-height: 16.5px;
            }
            .category-img-wrapper {
              position: absolute;
              right: 0;
              bottom: 0;
              .category-img1 {
                position: absolute;
                right: 0;
                bottom: -5px;
                z-index: 100;
                width: 48px;
              }
              .category-img2 {
                position: absolute;
                right: 30px;
                bottom: -5px;
                z-index: 90;
                width: 36px;
              }
            }
          }
        }
      }
    }
    .home-book-footer {
      margin: 12px 20px 20px 20px;
    }
  }
</style>

<!-- 修改组件库的样式时需要定义全局样式才能生效 -->
<style lang="scss">
  .home-book-footer {
    .home-book-btn {
      width: 100%;
      font-size: 14px;
      color: #3696EF;
      border: 1px solid #EDEEEE;
    }
  }
  .category-img1 {
    .image {
      border-radius: 0 0 10px 0;
    }
  }
</style>