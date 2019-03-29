<template>
  <div class="navbar-menu is-active">
    <div
      v-if="!user"
      class="navbar-item"
    >
      <a
        @click="$emit('loginClicked')"
        class="button is-primary"
      >
        <span class="icon">
          <i class="fas fa-user" />
        </span>
        <span>Login/Sign up</span>
      </a>
    </div>
    <div
      v-if="!!user"
      class="navbar-item has-dropdown is-hoverable"
    >
      <router-link
        :to="{name: 'dashboard'}"
        class="navbar-link"
      >
        Hey there, {{ user.attributes.name }}!
      </router-link>
      <div class="navbar-dropdown is-right is-boxed">
        <a
          class="navbar-item"
          @click="$store.dispatch('signOut')"
        >
          Sign Out
        </a>
        <a
          class="navbar-item"
          @click="$store.dispatch('listUsers')"
        >
          list users
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'user'
  ])
}
</script>
