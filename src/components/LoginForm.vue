<template>
  <form @submit.prevent="submit()">
    <div class="notification is-white">
      <b-notification
        type="is-danger"
        :active.sync="displayErrorMessage"
      >
        {{ errorMessage }}
      </b-notification>
      <b-field label="Email">
        <b-input
          type="email"
          v-model="username"
          placeholder="Your Email"
          required
        />
      </b-field>
      <b-field
        v-if="pwResetMode"
        label="Reset Code"
      >
        <b-input
          type="text"
          v-model="resetCode"
          password-reveal
          placeholder="Reset code"
          required
        />
      </b-field>
      <b-field :label="'Password'">
        <b-input
          type="password"
          v-model="password"
          password-reveal
          placeholder="Your password"
          required
        />
      </b-field>
      <div class="level">
        <div class="level-right">
          <div class="level-item">
            <button
              :class="{ 'is-loading': loading }"
              class="is-pulled-right button is-primary"
            >
              Login
            </button>
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
  }
}
</script>
