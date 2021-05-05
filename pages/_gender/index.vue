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
  data() {
    return {
      products: [
        {
          _id: 1,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 2,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 3,
          name: 'Nike Jordan Nike Jordan Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 4,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 5,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 6,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 7,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 8,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
          discount: 10,
        },
        {
          _id: 9,
          name: 'Nike Jordan Nike Jordan Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 10,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
      ],
      filters: {
        gender: '',
        category: '',
        brand: '',
      },
    }
  },
  created() {
    this.filters.gender = this.$route.params.gender
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
