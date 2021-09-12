<template>
  <v-form-cost :cost-props="cost" @save="saveCost" />
</template>

<script>
import VFormCost from '~/components/VFormCost.vue'

export default {
  components: {
    VFormCost,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const costData = await $axios.get(`/admin/cost/${params.id}`)
      return {
        cost: costData.data.cost,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  methods: {
    async saveCost(form) {
      try {
        const payload = JSON.parse(JSON.stringify(form))

        payload.dateIn = payload.dateIn ? new Date(payload.dateIn) : ''

        await this.$axios.put(`/admin/products/${this.product._id}`, payload)
        this.$router.push('/admin-panel/costs')
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>
