<template>
  <div>
    <v-table :headers="headers" :items="products" />
  </div>
</template>

<script>
import VTable from '@/components/VTable.vue'

export default {
  components: {
    VTable,
  },
  layout: 'admin',
  data() {
    return {
      headers: [],
      products: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
