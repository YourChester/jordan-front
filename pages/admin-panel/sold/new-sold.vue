<template>
  <div class="sold">
    <h1>Навая продажа</h1>
    <v-sold-form />
  </div>
</template>

<script>
import VSoldForm from '@/components/VSoldForm'

export default {
  components: {
    VSoldForm,
  },
  layout: 'admin',
}
</script>

<style lang="scss" scoped>
.sold {
  padding: 20px;
}
</style>
