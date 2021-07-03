<template>
  <div class="products-list__wrapper">
    <div class="products-list">
      <v-product-card
        v-for="product in products"
        :key="product._id"
        :product="product.products[0]"
        :products="product.products"
        :images="product.images"
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
    products: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 425px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }

  &::v-deep {
    .product__wrapper {
      margin: 10px auto;
    }
  }

  &__wrapper {
    width: 100%;
  }
}
</style>
