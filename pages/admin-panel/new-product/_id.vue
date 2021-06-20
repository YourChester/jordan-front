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
    saveProduct(form) {
      console.log(form)
    },
  },
}
</script>
