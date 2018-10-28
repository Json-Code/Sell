<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{current: index === currentIndex}" @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food, $event)" v-for="(food, index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.image" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @cartadd="cartadd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food" @cartadd="cartadd"></food>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Shopcart from '../shopcart/Shopcart'
import Cartcontrol from '../cartcontrol/cartcontrol'
import Food from '../food/Food'
export default {
  name: 'Goods',
  props: {
    goods:{
      type: Array
    },
    seller:{
      type: Object
    }
  },
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  components: {
    Shopcart,
    Cartcontrol,
    Food
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted () {
    this._initScroll()
  },
  methods: {
    _initScroll() {
      this.foodsScroll = new Bscroll('.foods-wrapper', {click: true, probeType: 3})
      this.menusScroll = new Bscroll('.menu-wrapper', {click: true})

      this.foodsScroll.on('scroll', (pos) => {
        clearInterval(timer)
        let timer = setTimeout(() => {
          this.scrollY = Math.abs(Math.round(pos.y))
          this._calculateHeight()
        }, 1000/60)
      })
    },
    _calculateHeight() {
      let foodList = document.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index) {
      let foodList = document.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    cartadd(target) {
      this.$refs.shopcart.drop(target)
    },
    selectFood(food, event) {
      this.selectedFood = food;
      this.$refs.food.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixin.styl";
  .goods
    display: flex
    position: absolute
    top: 3rem
    bottom: .92rem
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12rem
        line-height: .28rem
        padding: 0 .24rem
        &.current
          position: relative
          z-index: 10
          margin-top: -.02rem
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          font-size: .24rem
          width: 1.12rem
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: .28rem
        height: .52rem
        line-height: .52rem
        border-left: 2px solid #d9dde1
        font-size: .24rem
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: .32rem
        padding-bottom: .32rem
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 1.14rem
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: .04rem 0 .16rem 0
            height: .28rem
            line-height: .28rem
            font-size: .28rem
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: .2rem
            font-size: .2rem
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: .16rem
            line-height: .28rem
          .extra
            line-height: .2rem
            .count
              margin-right: .24rem
          .price
            font-weight: 700
            line-height: .47rem
            .now
              margin-right: .16rem
              font-size: .28rem
              color: rgb(240,  20, 20)
            .old
              text-decoration: line-through
              font-size: .2rem
              color: rgb(147,153, 159)
          .cartcontrol-wrapper
             position: absolute
             right: 0
             bottom: 0
</style>
