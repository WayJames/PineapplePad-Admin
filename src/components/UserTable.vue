<template>
  <b-table :data="users">
    <template slot-scope="props">
      <b-table-column field="name" label="Name">{{props.row.name}}</b-table-column>
      <b-table-column field="email" label="Email">
        {{props.row.email}}
        <b-tooltip v-if="props.row.email_verified === 'true'" label="Email verified">
          <b-icon icon="check" size="is-small"></b-icon>
        </b-tooltip>
        <b-tooltip v-else label="Email not verified">
          <b-icon icon="cancel" size="is-small"></b-icon>
        </b-tooltip>
      </b-table-column>
      <b-table-column field="phone" label="Phone">
        {{props.row.phone_number}}
        <b-tooltip v-if="props.row.phone_number_verified === 'true'" label="Phone verified">
          <b-icon icon="check" size="is-small"></b-icon>
        </b-tooltip>
        <b-tooltip v-else label="Phone not verified">
          <b-icon icon="cancel" size="is-small"></b-icon>
        </b-tooltip>
      </b-table-column>
      <b-table-column field="custom:apartmentPrefsSet" label="Apartment Prefs">
        <b-tooltip v-if="props.row['custom:apartmentPrefsSet']" label="User has set their apartment preferences.">
          <b-icon icon="check" size="is-small"></b-icon>
        </b-tooltip>
        <b-tooltip v-else label="User has not yet filled out apartment preferences.">
          <b-icon icon="cancel" size="is-small"></b-icon>
        </b-tooltip>
      </b-table-column>
    </template>
  </b-table>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: mapState({
    users: 'userList'
  }),
  async beforeMount () {
    await this.$store.dispatch('updateUserList')
  }
}
</script>
