<template>
  <div class="sold">
    <h1>Продажа</h1>
    <v-sold-form :sold="sold" />
  </div>
</template>

<script>
import VSoldForm from '@/components/VSoldForm'

export default {
  components: {
    VSoldForm,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const {
        data: { sold },
      } = await $axios.get(`/admin/solds/${params.id}`)

      return {
        sold,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
}
</script>

<style lang="scss" scoped>
.sold {
  padding: 20px;
}
</style>
