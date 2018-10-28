<template>
  <div id="app">
    <home-header :seller="seller"></home-header>
    <div class="tab border-1px">
      <router-link tag="div" to="/goods" class="tab-item">商品</router-link>
      <router-link tag="div" to="/ratings" class="tab-item">评论</router-link>
      <router-link tag="div" to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :goods="goods" :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
import HomeHeader from '@/pages/header/Header'
import axios from 'axios'
import {urlParse} from '@/assets/js/util'
export default {
  name: 'App',
  components: {
    HomeHeader
  },
  data () {
    return {
      goods: [],
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.GetsellerInfo()
  },
  methods: {
    GetsellerInfo () {
      axios.get('/api/seller.json?', {
        params: {
          id: this.$route.params.id
        }        
      })
        .then(this.handleGetsellerInfo)
      axios.get('/api/goods.json')
        .then(this.handleGetgoodsInfo)
    },
    handleGetsellerInfo (res) {
      res = res.data
      if (res) {
        this.seller = Object.assign({}, this.seller, res.seller)
        console.log(this.seller.id)
      }
    },
    handleGetgoodsInfo (res) {
      res = res.data
      if (res) {
        const data = res.goods
        this.goods = data
      }
    }
  }
}
</script>

<style lang="stylus">
@import "~styles/mixin.styl";
  .tab
    display: flex
    width: 100%
    height: .8rem
    line-height: .8rem
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      font-size: .28rem
      color: rgb(77, 85, 93)
    .active
      color: red
</style>
