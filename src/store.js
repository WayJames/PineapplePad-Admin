import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'lodash'
import jwt from 'jsonwebtoken'

import profileActions from '@/store/profile/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    passwordTemporaryStorage: ''
  },
  getters: {
    userSignedIn (state) {
      return state.user != null
    },
    userFullName (state) {
      return get(state, 'user.attributes.name', 'Not signed in.')
    },
    userGroups (state) {
      let decoded = jwt.decode(state.user.signInUserSession.accessToken.jwtToken)
      return decoded['cognito:groups']
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      if (user == null) {
        state.transactionData = []
      }
    },
    storePasswordTemporarily (state, password) {
      state.passwordTemporaryStorage = password
    }
  },
  actions: {
    ...profileActions
  }
})
