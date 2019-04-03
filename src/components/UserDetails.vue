<template>
<section class="section">
  <div class="tile">
        <h1 class="title">
        {{user.name}}
      </h1>
      <p class="subtitle">
        {{user.email}}
      </p>
  </div>
  </section>
</template>
<script>
export default {
  props: ['user']
}
</script>
