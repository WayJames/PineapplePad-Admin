import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserList from '@/views/UserList.vue'
import ApartmentList from '@/views/ApartmentList.vue'

import store from './store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/apartment/list',
      name: 'ApartmentList',
      component: ApartmentList
    },
    {
      path: '/about',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!store.user) { await store.dispatch('updateUser') }
  next()
})

export default router
