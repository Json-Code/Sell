<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" @click="select(2, $event)" :class="{active : selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0, $event)" :class="{active : selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1, $event)" :class="{active : selectType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{on : onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc:{
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select(type, event) {
      this.selectType = type
      this.$emit('ratingtype', type)
    },
    toggleContent(event) {
      this.onlyContent = !this.onlyContent
      this.$emit('contenttoogle', this.onlyContent)
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType == POSITIVE;
      })
    },
    negative() {
      return this.ratings.filter((rating) => {
        return rating.rateType == NEGATIVE;
      })      
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixin.styl";
  .ratingselect
    .rating-type
      padding: .36rem 0
      margin: 0 .36rem
      border-1px(rgba(7, 17, 27, .5))
      font-size: 0
      .block
        display: inline-block
        padding: .16rem .24rem
        margin-right: .16rem
        line-height: .32rem
        border-radius: 1px
        color: rgb(77, 85, 93)
        font-size: .24rem
        &.active
          color: #fff
        .count
          margin-left: .04rem
          font-size: .16rem
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: .24rem .36rem
      line-height: .49rem
      border-bottom: 1px solid rgba(7, 17, 27, .5)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: .08rem
        font-size: .49rem
      .text
        display: inline-block
        vertical-align: top        
        font-size: .24rem
</style>
