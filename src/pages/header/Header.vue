<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64px" height="64px" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletion-title"></span><span class="bulletion-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hiddenDeatil">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '../star/start'
export default {
  name: 'HomeHeader',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  components:{
    Star
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hiddenDeatil () {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixin.styl";
  .fade-enter, .fade-leave-to
    opacity: 0
  .header
    position: relative
    color: #fff
    background: rgba(7, 17, 27, .5)
    overflow: hidden
    .content-wrapper
      vertical-align: top
      position: relative
      padding: .24rem .12rem .18rem .24rem
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
      .content
        display: inline-block
        font-size: .14rem
        text-align: bottom
        margin-left: .32rem
        .title
          margin:.04rem 0 .16rem 0
          .brand
            display: inline-block
            width: .6rem
            height: .36rem
            vertical-align: top
            bg-image('brand')
            background-size: .6rem .36rem
          .name
            margin-left: .32rem
            line-height: .36rem
            font-weight: bold
      .description
        margin-bottom: .2rem
        line-height: .24rem
        font-size: .24rem
      .supports
        .icon
          display: inline-block
          vertical-align: top
          width: .24rem
          height: .24rem
          margin-right: .08rem
          background-size: .24rem .24rem
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          line-height: .24rem
          font-size: .24rem
      .support-count
        position: absolute
        vertical-align: top
        right: .24rem
        bottom: .36rem
        padding: 0 .16rem
        height: .48rem
        line-height: .48rem
        border-radius: .24rem
        background: rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size: .2rem
        .icon-keyboard_arrow_right
          line-height: .48rem
          font-size: .2rem
    .bulletin-wrapper
      position: relative
      height: .36rem
      line-height: .36rem
      padding: .08rem .44rem .08rem .24rem
      white-space: nowrap
      overflow: hidden
      background: rgba(17,16,17,.2)
      text-overflow: ellipsis
      .bulletion-title
        display: inline-block
        width: .44rem
        height: .24rem
        bg-image('bulletin')
        background-size: .44rem .24rem
      .bulletion-text
        margin: 0 .08rem
        font-size: .2rem
      .icon-keyboard_arrow_right
        position: absolute
        right: .24rem
        top: .18rem
        font-size: .2rem
    .background
      position: absolute
      z-index: -1
      top: 0
      left: 0
      height: 100%
      height: 100%
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      transition: all 0.5s
      backdorp-filter: blur(10px)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 1.2rem
          padding-bottom: 1.2rem
          .name
            font-size: .32rem
            line-height: .32rem
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: .36rem
            padding: .04rem 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: .6rem auto .48rem auto
            .line
              flex: 1
              position: relative
              top: -.34rem
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              padding: 0.24rem
              font-size: .28rem
              font-weight: bold
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 .24rem
              margin-bottom: .24rem
              font-size: 0
              &:list-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: .32rem
                height: .32rem
                vertical-align: top
                margin-right: .12rem
                background-size: .32rem .32rem
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_1')
                &.discount
                  bg-image('discount_1')
                &.guarantee
                  bg-image('guarantee_1')
                &.invoice
                  bg-image('invoice_1')
                &.special
                  bg-image('special_1')
              .text
                line-height: .32rem
                font-size: .24rem
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 .24rem
              font-size: .24rem
              line-height: .50rem

      .detail-close
        position: relative
        width: .64rem
        height: .64rem
        margin: -1.08rem auto 0 auto
        clear: both
        font-size: .64rem
</style>
