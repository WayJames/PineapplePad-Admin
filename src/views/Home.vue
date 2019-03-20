<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <login-form />>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'home',
  components: {
    LoginForm
  }
}
</script>
