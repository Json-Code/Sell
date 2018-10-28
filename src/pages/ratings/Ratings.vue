<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>            
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @ratingtype="ratingtype" @contenttoogle="contenttoogle" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="(item, index) in rating.recommend" :key="index" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const ALL = 2
import BScroll from 'better-scroll'
import axios from 'axios'
import star from '@/pages/star/start'
import Split from '../split/Split'
import Ratingselect from '../ratingselect/ratingselect'
import {formaDate} from '@/assets/js/date'
export default {
  name: 'Ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }      
    }
  },
  created() {
    axios.get('/api/ratings.json')
      .then((res) => {
        res = res.data
        if (res) {
          this.ratings = res.ratings
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll('.ratings', {click: true})
          } else {
            this.scroll.refresh()
          }
        })          
        }
      })
  },
  methods: {
    ratingtype(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    contenttoogle(type) {
      this.onlyContent = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })      
    },
    needShow(type, text) {
      if(this.onlyContent && !text) {
        return false;
      }
      if(this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formaDate(date, 'yyyy-MM-dd hh:mm')
    }
  },  
  components: {
    star,
    Split,
    Ratingselect
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixin.styl"
  .ratings
    position: absolute
    top: 3.48rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: .36rem 0
      .overview-left
        width: 2.74rem
        padding-bottom: .12rem
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px) {
          width: 2.4rem
        }
        .score
          margin-bottom: .12rem
          line-height: .56rem
          font-size: .49rem
          color: rgb(255, 153, 0)
        .title
          margin-bottom: .16rem
          line-height: .24rem
          font-size: .24rem
          color: rgb(7, 17, 27)
        .rank
          line-height: .4rem
          font-size: .2rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: .12rem 0 .12rem .49rem
        @media only screen and (max-width: 320px) {
          padding-left: .12rem
        }
        .score-wrapper
          margin-bottom: .16rem
          font-size: 0
          .title
            display: inline-block
            line-height: .36rem
            vertical-align: top
            font-size: .24rem
            color: rgb(7, 17, 27)
          .star
            display: inline-block        
            margin: 0 .24rem
            vertical-align: top
          .score
            display: inline-block
            line-height: .36rem
            vertical-align: top
            font-size: .2rem
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: .36rem            
            font-size: .24rem
            color: rgb(7, 17, 27)
          .delivery
            margin-left: .24rem
            font-size: .24rem
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 .36rem
      .rating-item
        display: flex
        padding: .36rem 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 .56rem
          width: .56rem
          margin-right: .24rem
          img 
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: .08rem
            line-height: .24rem
            font-size: .2rem
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: .12rem
            font-size: 0
            .star
              display: inline-block
              margin-right: .12rem
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: .24rem
              font-size: .2rem
              color: rgb(147, 153, 159)
          .text
            margin-bottom: .16rem
            line-height: .36rem
            color: rgb(7, 17, 27)
            font-size: .24rem
          .recommend
            line-height: .32rem
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 .16rem .08rem 0
              font-size: .18rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 .12rem
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: .24rem
            font-size: .12rem
            color: rgb(147, 153, 159)
</style>
