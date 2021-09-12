<template>
  <v-form-product @add="addProduct" />
</template>

<script>
import VFormProduct from '~/components/VFormProduct.vue'

export default {
  components: {
    VFormProduct,
  },
  layout: 'admin',
  methods: {
    async addProduct(form) {
      try {
        await this.$axios.post(`/admin/products`, {
          ...form,
        })
        this.$router.push('/admin-panel/products')
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>
