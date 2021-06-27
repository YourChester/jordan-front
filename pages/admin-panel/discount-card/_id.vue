<template>
  <div class="discount-card">
    <h1>Дисконтная карта</h1>
    <v-form-discount-card :card="discountCard" />
  </div>
</template>

<script>
import VFormDiscountCard from '@/components/VFormDiscountCard'

export default {
  components: {
    VFormDiscountCard,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const discountCardsData = await $axios.get(
      `/admin/discount-cards/${params.id}`
    )
    return {
      discountCard: discountCardsData.data.discountCard,
    }
  },
}
</script>

<style lang="scss" scoped>
.discount-card {
  padding: 20px;
}
</style>
