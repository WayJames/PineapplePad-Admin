<template>
  <div class="container">
    <b-table :data="data" :columns="columns"></b-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        }
      ]
    }
  }
}
</script>
