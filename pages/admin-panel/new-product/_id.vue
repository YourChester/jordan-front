<template>
  <v-form-product :product-props="product" @save="saveProduct" />
</template>

<script>
import VFormProduct from '~/components/VFormProduct.vue'

export default {
  components: {
    VFormProduct,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const productsData = await $axios.get(`/admin/products/${params.id}`)
    return {
      product: productsData.data.product,
    }
  },
  methods: {
    async saveProduct(form) {
      try {
        const payload = JSON.parse(JSON.stringify(form))

        payload.dateIn = payload.dateIn ? new Date(payload.dateIn) : ''

        await this.$axios.put(`/admin/products/${this.product._id}`, payload)
        this.$router.push('/admin-panel')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
