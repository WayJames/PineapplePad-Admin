<template>
  <div class="home">
    <section class="hero is-info is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Login to PineapplePad Admin Portal
          </h1>
          <h2 class="subtitle">
            You can only log in here if you are an administrator.
          </h2>
          <div class="container">
            <article class="is-child notification is-info column is-4 is-offset-4">
              <login-form v-if="!user" />
              <div
                class="notification is-white"
                v-else
              >
                You are already signed in.<br>
                Use the buttons above to navigate.
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Home',
  components: {
    LoginForm
  },
  computed: mapState(['user'])
}
</script>
