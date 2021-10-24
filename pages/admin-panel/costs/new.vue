<template>
  <v-form-cost :cost-props="cost" @add="addCost" />
</template>

<script>
import { getDateForInput } from '@/assets/utils/date'
import VFormCost from '~/components/VFormCost.vue'

export default {
  components: {
    VFormCost,
  },
  layout: 'admin',
  async asyncData({ $axios, query }) {
    try {
      if (query.id) {
        const {
          data: { cost },
        } = await $axios.get(`/admin/costs/${query.id}`)
        delete cost._id
        cost.date = getDateForInput(new Date())
        return {
          cost,
        }
      } else {
        return {
          cost: null,
        }
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  methods: {
    async addCost(form) {
      try {
        await this.$axios.post(`/admin/costs`, {
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
