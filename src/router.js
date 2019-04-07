import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserList from '@/views/UserList.vue'
import ApartmentList from '@/views/ApartmentList.vue'

import { Snackbar } from 'buefy/dist/components/snackbar'
import store from './store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true }
    },
    {
      path: '/apartment/list',
      name: 'ApartmentList',
      component: ApartmentList,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      let user = await store.dispatch('updateUser')
      if (user) {
        next()
      } else {
        Snackbar.open('You need to sign in to do that.')
        next({
          name: 'home'
        })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
