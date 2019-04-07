<template>
  <section class="section">
    <p class="title">
      {{ user.name }}
    </p>
    <p class="subtitle">
      {{ user.email }}<br>
      {{ user.phone_number }}
    </p>
    <p class="title">
      Apartment Preferences:
    </p>
  </section>
</template>
<script>
export default {
  props: ['user'],
  watch: {
    user: function (userId, old) {
      this.$store.dispatch('getPrefsForUser', userId.sub)
    }
  }
}
</script>
