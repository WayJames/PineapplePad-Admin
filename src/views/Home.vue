<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <section class="section">
      <div class="container">
        <div class="columns">
          <article class="is-child notification is-info column is-4 is-offset-4">
            <login-form />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Home',
  components: {
    LoginForm
  }
}
</script>
