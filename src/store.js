import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'lodash'

import profileActions from '@/store/profile/actions'
import adminActions from '@/store/admin/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    passwordTemporaryStorage: '',
    userList: []
  },
  getters: {
    userSignedIn (state) {
      return state.user != null
    },
    userFullName (state) {
      return get(state, 'user.attributes.name', 'Not signed in.')
    },
    userGroups (state) {
      // let decoded = jwt.decode(state.user.signInUserSession.accessToken.jwtToken)
      return state.user.signInUserSession.idToken.payload['cognito:groups'] || []
      // return decoded['cognito:groups'] || []
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    storePasswordTemporarily (state, password) {
      state.passwordTemporaryStorage = password
    }
  },
  actions: {
    ...profileActions,
    ...adminActions
  }
})
