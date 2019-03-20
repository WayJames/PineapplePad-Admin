import { Auth, API } from 'aws-amplify'
import router from '@/router'

export default {
  async getApartments (context) {
    API.get('getapartments', '/Dev/apartments').then(resp => {
      console.log(resp)
    }).catch(err => {
      console.log(err)
    })
  },
  async signOut ({ commit }) {
    await Auth.signOut()
    commit('setDisplayApartmentPrefsWarning', false)
    router.push('/')
    commit('setUser', null)
  },
  async updateUser ({ commit, dispatch }) {
    try {
      let user = await Auth.currentAuthenticatedUser()
      if (user.attributes['custom:apartmentPrefsSet'] !== '1') {
        commit('setDisplayApartmentPrefsWarning', true)
      } else {
        commit('setDisplayApartmentPrefsWarning', false)
      }
      commit('setUser', user)
      return user
    } catch (err) {
      commit('setUser', null)
      throw err
    }
  },
  async signIn ({ commit, dispatch }, { username, password, redirect }) {
    try {
      let user = await Auth.signIn(username, password)
      dispatch('updateUser')
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        router.push({ name: 'force_password_change' })
      } else if (redirect) {
        router.push(redirect)
      } else {
        router.push({ name: 'profile' })
      }
      return user
    } catch (err) {
      throw err
    }
  },
  async forgotPassword (context, { username }) {
    try {
      return await Auth.forgotPassword(username)
    } catch (err) {
      switch (err.code) {
        case 'NotAuthorizedException':
          err.message = 'An error occurred. Please contact support.'
          break
        case 'UserNotFoundException':
          err.message = 'User not found.'
          break
      }
      throw err
    }
  },
  async changePassword (context, { oldPass, newPass }) {
    try {
      return await Auth.changePassword(context.state.user, oldPass, newPass)
    } catch (err) {
      throw err
    }
  },
  async resetPassword (context, { username, password, code }) {
    try {
      return await Auth.forgotPasswordSubmit(username, code, password)
    } catch (err) {
      throw err
    }
  },
  async signUp ({ commit }, args) {
    try {
      let user = await Auth.signUp(args)
      if (!user.userConfirmed) {
        commit('storePasswordTemporarily', args.password)
        router.push({ name: 'confirm_account', params: { username: args.username } })
      }
      return user
    } catch (err) {
      throw err
    }
  },
  async updateUserAttributes ({ dispatch, state }, args) {
    try {
      Auth.updateUserAttributes(state.user, args)
      // We will return which contacts are verified so we can check
      // if the user needs to verify any contacts now due to attributes change
      let resp = await Auth.verifiedContact(state.user)
      try {
        // Make sure we have the latest version of the user on hand
        await dispatch('updateUser')
        return resp
      } catch (err) {
        throw err
      }
    } catch (err) {
      throw err
    }
  },
  async verifyEmailAddress ({ state }, { code }) {
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code)
      return await Auth.verifiedContact(state.user)
    } catch (err) {
      throw err
    }
  },
  async resendVerificationCode ({ state }, { username }) {
    try {
      return await Auth.resendSignUp(username)
    } catch (err) {
      throw err
    }
  },
  async submitVerificationCode ({ dispatch, state }, { username, code }) {
    try {
      let resp = await Auth.confirmSignUp(username, code)
      // Confirming sign up doesn't log the user in.
      // So we do this to seamlessly sign the user in behind the scenes
      if (state.passwordTemporaryStorage) {
        try {
          await dispatch('signIn', { username, password: state.passwordTemporaryStorage })
          router.push({ name: 'gather_user_data' })
        } catch (err) {
          err.message = 'An unexpcted error occurred. Please contact us.'
          throw err
        }
      }
      return resp
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
          err.message = 'User not found.'
          break
      }
      throw err
    }
  },
  async submitApartmentPrefs ({ commit, state }, attributes) {
    try {
      // let user = await Auth.currentUserPoolUser()
      // console.log(user)
      // attributes.userId = user.username
      let resp = await API.put('accountattributescrud', '/items', { body: attributes })
      await Auth.updateUserAttributes(state.user, {
        'custom:apartmentPrefsSet': '1'
      })
      router.push({ name: 'profile' })
      commit('setDisplayApartmentPrefsWarning', false)
      console.log('Apartment prefs updated')
      console.log(resp)
      return resp
    } catch (err) {
      console.log('submit apartment prefs error')
      console.log(err)
      throw err
    }
  },
  async getApartmentPrefs ({ commit }) {
    let myInit = { headers: {}, response: true, queryStringParameters: {} }
    try {
      let resp = await API.get('accountattributescrud', '/items/userId', myInit)
      if (resp.data.length) {
        commit('setApartmentPrefs', resp.data[0])
      } else {
        return resp.data
      }
      return resp.data[0]
    } catch (err) {
      console.log('Get apartment prefs error')
      console.log(err)
      throw err
    }
  }
}
