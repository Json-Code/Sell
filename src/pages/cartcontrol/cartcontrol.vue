<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click.stop.prevent="decreaseCart"></div>    
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
        this.food.count = 1
      } else {
        this.food.count += 1
      }
      this.$emit('cartadd', event.target)
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count -= 1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .move-enter, .move-leave-to
    opacity: 0
    transform: translate3d(.49rem, 0, 0) rotateZ(180deg)
  .move-leave, .move-enter-to
    transform: translate3d(0, 0, 0) rotateZ(0)
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      padding: .12rem
      line-height: .49rem
      font-size: .49rem
      color: rgb(0, 160, 220)
    .cart-decrease
      display: inline-block
      transition: all .5s
    .cart-count
      display: inline-block
      vertical-align: top
      width: .24rem
      padding-top: .12rem
      line-height: .49rem
      text-align: center
      font-size: .2rem
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
</style>

