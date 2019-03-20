<template>
    <form @submit.prevent="submit()">
              <div class="notification is-white">
                <b-notification type="is-danger" :active.sync="displayErrorMessage">
                  {{errorMessage}}
                </b-notification>
                <b-field label="Email">
                  <b-input type="email" v-model="username" placeholder="Your Email" required>
                  </b-input>
                </b-field>
                <b-field v-if="pwResetMode" label="Reset Code">
                  <b-input type="text" v-model="resetCode" password-reveal placeholder="Reset code" required>
                  </b-input>
                </b-field>
                <b-field :label="pwResetMode ? 'New Password' : 'Password'">
                  <b-input type="password" v-model="password" password-reveal placeholder="Your password" required>
                  </b-input>
                </b-field>
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <a class="has-text-black" v-if="pwResetMode" @click="pwResetMode = false">Cancel</a>
                      <a class="has-text-black" v-else @click="forgotPassword()">Forgot password?</a>
                    </div>
                    <div class="level-item">
                      <router-link class="has-text-black" to="register">Register</router-link>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <button v-bind:class="{ 'is-loading': loading }" v-if="pwResetMode" class="is-pulled-right button is-primary">Submit New Password</button>
                      <button v-bind:class="{ 'is-loading': loading }" v-else class="is-pulled-right button is-primary">Login</button>
                    </div>
                  </div>
                </div>

              </div>
            </form>
</template>
<script>
export default {
  data () {
    return {
      pwReset: false,
      errorMessage: '',
      username: '',
      password: '',
      displayErrorMessage: false,
      resetCode: '',
      pwResetMode: false,
      loading: false
    }
  },
  methods: {
    submit () {
      if (this.pwResetMode) {
        this.loading = true
        this.$store.dispatch('resetPassword', {
          username: this.username,
          password: this.password,
          code: this.resetCode
        }).then(usr => {
          this.loading = false
          this.$snackbar.open(`Password reset was successfully!`)
          this.pwResetMode = false
        }).catch(err => {
          this.loading = false
          this.displayErrorMessage = true
          this.errorMessage = err.message
        })
      } else {
        this.loading = true
        this.$store.dispatch('signIn', {
          username: this.username,
          password: this.password,
          redirect: this.$router.currentRoute.query.redirect
        }).then(usr => {
          this.loading = false
          this.displayErrorMessage = false
        }).catch(err => {
          if (err.code === 'UserNotConfirmedException') {
            this.$snackbar.open('Please verify your email address before continuing.')
            this.$store.commit('storePasswordTemporarily', this.password)
            this.$router.push({ name: 'confirm_account', params: { username: this.username } })
          }
          this.loading = false
          this.errorMessage = err.message
          this.displayErrorMessage = true
        })
      }
    },
    forgotPassword () {
      if (this.username) {
        this.loading = true
        this.$store.dispatch('forgotPassword', {
          username: this.username
        }).then((resp) => {
          this.loading = false
          this.displayErrorMessage = false
          this.$snackbar.open(`A reset code was sent via ${resp.CodeDeliveryDetails.DeliveryMedium} to ${resp.CodeDeliveryDetails.Destination}`)
          this.pwResetMode = true
        }).catch((err) => {
          this.loading = false
          this.displayErrorMessage = true
          this.errorMessage = err.message
        })
      } else {
        this.errorMessage = 'Please enter a username.'
        this.displayErrorMessage = true
      }
    }
  }
}
</script>
