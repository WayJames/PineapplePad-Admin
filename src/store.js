import Vue from 'vue'
import Vuex from 'vuex'

import profileActions from '@/store/profile/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    ...profileActions
  }
})
