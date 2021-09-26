<template>
  <v-form-product :product-props="product" />
</template>

<script>
import VFormProduct from '~/components/VFormProduct.vue'

export default {
  components: {
    VFormProduct,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const productsData = await $axios.get(`/admin/products/${params.id}`)
      return {
        product: productsData.data.product,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
}
</script>
