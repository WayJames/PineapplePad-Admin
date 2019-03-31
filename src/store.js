import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

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
      return _.get(state, 'user.attributes.name', 'Not signed in.')
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
    setUserList (state, awsusers) {
      let userList = []
      // This extracts the attributes into an object because AWS's formatting is weird
      awsusers.forEach((user) => {
        let attributes = {}
        user.Attributes.forEach((item) => {
          attributes[item.Name] = item.Value
        })
        userList.push(attributes)
      })

      state.userList = userList
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
