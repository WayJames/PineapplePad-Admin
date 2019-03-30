<template>
<div class="userList">
  <div class="container">
    <UserTable/>
  </div>
</div>
</template>
<script>
import UserTable from '@/components/UserTable.vue'
export default {
  components: {
    UserTable
  },
  data () {
    return {

    }
  }
}
</script>
