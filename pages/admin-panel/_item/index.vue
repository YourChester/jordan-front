<template>
  <div>
    {{ product }}
  </div>
</template>

<script>
export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const productData = await $axios.get(`/admin/products/${params.item}`)
    return {
      product: productData.data.product,
    }
  },
  data() {},
  methods: {
    getCurrentDate(data) {
      const day = new Date(data).getDate()
      const month = new Date(data).getMonth()
      const year = new Date(data).getFullYear()
      return data ? `${day}.${month}.${year}` : ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
