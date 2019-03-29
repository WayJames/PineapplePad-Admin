<template>
  <div id="app">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link
          class="navbar-item"
          to="/"
        >
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          >
        </router-link>
        <a
          role="button"
          :class="{'is-active': mobileMenuOpen}"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div
        class="navbar-menu"
        :class="{'is-active': mobileMenuOpen}"
      >
        <div class="navbar-start">
          <router-link
            to="/"
            class="navbar-item"
          >
            Users
          </router-link>
          <router-link
            to="/"
            class="navbar-item"
          >
            Apartment Listings
          </router-link>
          <router-link
            to="/"
            class="navbar-item"
          >
            Add Apartment
          </router-link>
        </div>
        <div class="navbar-end">
          <navbar-user-button @loginClicked="$router.push({name: 'login'})" />
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import NavbarUserButton from '@/components/NavbarUserButton.vue'
export default {
  components: {
    NavbarUserButton
  },
  data: () => {
    return {
      mobileMenuOpen: false
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
