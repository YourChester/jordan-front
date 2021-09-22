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
      const costData = await $axios.get(`/admin/costs/${params.id}`)
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
        await this.$axios.put(`/admin/costs/${form._id}`, {
          ...form,
        })
        this.$router.push('/admin-panel/costs')
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>
