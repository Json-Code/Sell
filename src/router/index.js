import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/pages/goods/Goods'
import Ratings from '@/pages/ratings/Ratings'
import Seller from '@/pages/seller/Seller'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Goods',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }, {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
