<template>
  <div class="discount-card">
    <h1>Новая дисконтная карта</h1>
    <v-form-discount-card :code="code" />
  </div>
</template>

<script>
import VFormDiscountCard from '@/components/VFormDiscountCard'

export default {
  components: {
    VFormDiscountCard,
  },
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const discountCardsData = await $axios.get(
        `/admin/discount-cards/new-code`
      )
      return {
        code: discountCardsData.data.code,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
}
</script>

<style lang="scss" scoped>
.discount-card {
  padding: 20px;
}
</style>
