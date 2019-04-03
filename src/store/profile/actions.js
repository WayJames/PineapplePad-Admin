import { Auth } from 'aws-amplify'
import router from '@/router'
import AWS from 'aws-sdk'

import { Snackbar } from 'buefy/dist/components/snackbar'

export default {
  async signOut ({ commit }) {
    await Auth.signOut()
    router.push('/')
    commit('setUser', null)
  },
  async updateUser ({ commit, dispatch }) {
    try {
      let user = await Auth.currentAuthenticatedUser()
      let creds = await Auth.currentUserCredentials()
      // let essentialCreds = Auth.essentialCredentials(creds)

      AWS.config.accessKeyId = creds.accessKeyId
      AWS.config.secretAccessKey = creds.secretAccessKey
      AWS.config.sessionToken = creds.sessionToken
      commit('setUser', user)
      return user
    } catch (err) {
      commit('setUser', null)
      return null
    }
  },
  async signIn ({ getters, dispatch }, { username, password, redirect }) {
    try {
      let user = await Auth.signIn(username, password)
      await dispatch('updateUser')
      if (!getters.userGroups.includes('admins')) {
      // User isn't an admin
        let err = { message: 'You are not an admin.' }
        dispatch('signOut') // sign the user out immediately
        throw err
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // User needs a new password
        Snackbar.open('You need to update your password. Please sign in to main PineapplePad to correc this error.')
      } else if (redirect) {
        // We need to redirect somewhere
        router.push(redirect)
      }
      return user
    } catch (err) {
      throw err
    }
  }

}
