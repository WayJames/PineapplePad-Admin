import { Auth } from 'aws-amplify'
import router from '@/router'
import AWS from 'aws-sdk'

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
      let essentialCreds = Auth.essentialCredentials(creds)

      AWS.config.accessKeyId = essentialCreds.accessKeyId
      AWS.config.secretAccessKey = essentialCreds.secretAccessKey
      AWS.config.sessionToken = essentialCreds.sessionToken
      commit('setUser', user)
      return user
    } catch (err) {
      commit('setUser', null)
      throw err
    }
  },
  async signIn ({ getters, dispatch, commit }, { username, password, redirect }) {
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
        router.push({ name: 'force_password_change' })
      } else if (redirect) {
        // We need to redirect somewhere
        router.push(redirect)
      } else {
        // Just go to dashboard
        // router.push({ name: 'dashboard' })
      }
      return user
    } catch (err) {
      throw err
    }
  }

}
