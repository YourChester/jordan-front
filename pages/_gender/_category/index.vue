<template>
  <div class="catalog__wrapper">
    <div class="catalog">
      <div class="catalog__left-side">
        <v-products-filters :filters="filters" />
      </div>
      <div class="catalog__right-side">
        <v-products-list :products="products" />
      </div>
    </div>
  </div>
</template>

<script>
import VProductsFilters from '@/components/VProductsFilters'
import VProductsList from '@/components/VProductsList'

export default {
  components: {
    VProductsList,
    VProductsFilters,
  },
  data() {
    return {
      products: [],
      filters: {},
    }
  },
}
</script>
