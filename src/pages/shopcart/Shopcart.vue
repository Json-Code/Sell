<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight : totalCount}">
              <span class="icon-shopping_cart" :class="{highlight : totalCount}"></span>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight : totalCount}">{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-for="(ball, index) in balls" :key="index"  v-show="ball.show" class="ball">
            <div class="inner"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>    
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hidelist"></div>
    </transition>
  </div>  
</template>

<script>
import Bscroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }                                
      ],
      dropBalls: [],
      fold: true
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i<this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.transform =  `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */ 
      let rf = el.offsetHeight;                 /*触发浏览器重绘;*/
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform =  'translate3d(0, 0, 0)'       
        el.addEventListener('transitionend', done);
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none'
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach((food, index) => {
        food.count = 0;
      })
    },
    hidelist() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}`)
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count +=food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if(this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll('.list-content', {click: true})   
          } else {
            this.scroll.refresh();
          }
        })
      }
      return show;
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/styles/mixin.styl';
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: .96rem
    background: black
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -.2rem
          margin: 0 .24rem
          padding: .12rem
          width: 1.12rem
          height: 1.12rem
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: .49rem
              color: #80858a
              line-height: .98rem
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: .49rem
            height: .32rem
            line-height: .32rem
            text-align: center
            border-radius: .32rem
            font-size: .18rem
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 .08rem .16rem 0 rgba(0, 0, 0, .4)
        .price
          display: inline-block
          vertical-align: top
          line-height: .49rem
          margin-top: .24rem
          padding-right:  .24rem
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, .1)
          font-size: .32rem
          font-weight: 700
          color: rgba(255, 255, 255, .4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: .24rem 0 0 .24rem
          line-height: .49rem
          color: rgba(255, 255, 255, .4)
          font-size: .2rem
      .content-right
        flex: 0 0 2.1rem
        width: 2.1rem
        .pay
          height: .96rem
          line-height: .96rem
          text-align: center
          font-size: .24rem
          color: rgba(255, 255, 255, .4)
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: .64rem
        bottom: .44rem
        z-index: 200
        &.drop-enter-active
          transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)        
        .inner
          width: .32rem
          height: .32rem
          border-radius: 50%
          background: #00a0dc
          transition: all .4s linear
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)      
      &.fold-enter-active, &.fold-leave-active
         transition: all .5s
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      &.folf-leave, &.fold-enter-to
        transform: translate3d(0, -100%, 0)
      .list-header
        height: .8rem
        line-height: .8rem
        padding: 0 .36rem
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27 .1)
        .title
          float: left
          font-size: .28rem
          color: rgb(7, 17, 27)
        .empty
          float: right 
          font-size: .24rem
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 .36rem
        max-height: 4.34rem
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: .24rem 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27 .1))
          .name
            line-height: .49rem
            font-size: .28rem
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 1.8rem
            bottom: .24rem
            line-height: .49rem
            font-size: .28rem
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: .10rem
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    opacity: 1
    background: rgba(7, 17, 27, .6)
    backdrop-filter: blur(10px)
    &.fade-enter-active, &.fade-leave-active
      transition: all .5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>

