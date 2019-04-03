<template>
<div class="userList">
  <div class="container is-fluid">
    <div class="columns">
      <UserTable :selected.sync="selected" class="column is-half"/>
      <UserDetails :user="selected" class="column"/>
    </div>
  </div>
</div>
</template>
<script>
import UserTable from '@/components/UserTable.vue'
import UserDetails from '@/components/UserDetails.vue'

export default {
  components: {
    UserTable,
    UserDetails
  },
  data () {
    return {
      selected: {}
    }
  }
}
</script>
