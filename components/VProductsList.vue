<template>
  <div class="products-list__wrapper">
    <div class="products-list">
      <v-product-card
        v-for="product in poroducts"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import VProductCard from '@/components/VProductCard'

export default {
  components: {
    VProductCard,
  },
  props: {
    poroducts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped></style>
