<template>
  <div class="catalog__wrapper">
    <div class="catalog">
      <div class="catalog__left-side">
        <v-products-filters :filters="filters" @clear="clearFilters" />
      </div>
      <div class="catalog__right-side">
        <div class="right-side">
          <h1 class="right-side__title">Весь каталог</h1>
          <div class="right-side__count-filter">Показать товаров</div>
        </div>
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
  async asyncData({ $axios, params }) {
    const filters = {
      gender: params.gender || '',
      category: params.category || '',
      brand: '',
    }
    const productsData = await $axios.get('/products', {
      params: {
        limit: 25,
        ...params,
      },
    })
    return {
      products: productsData.data.products,
      filters,
    }
  },
  methods: {
    clearFilters() {
      this.filters = {
        gender: '',
        category: '',
        brand: '',
      }
    },
  },
}
</script>
