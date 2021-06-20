<template>
  <div class="catalog__wrapper">
    <div class="catalog">
      <div class="catalog__left-side">
        <v-products-filters
          :filters="filters"
          :filters-value="filtersValue"
          @clear="clearFilters"
          @set-filter="setNewFilter"
        />
      </div>
      <div class="catalog__right-side">
        <div class="right-side">
          <h1 class="right-side__title">Весь каталог</h1>
          <div class="right-side__count-filter">
            <div class="filter-count__title">Показать товаров</div>
            <div
              class="filter-count__item"
              :class="filters.limit === 12 ? 'active' : ''"
              @click="
                filters.limit === 12
                  ? null
                  : setNewFilter({ key: 'limit', value: 12 })
              "
            >
              12
            </div>
            <div
              class="filter-count__item"
              :class="filters.limit === 24 ? 'active' : ''"
              @click="
                filters.limit === 24
                  ? null
                  : setNewFilter({ key: 'limit', value: 24 })
              "
            >
              24
            </div>
            <div
              class="filter-count__item"
              :class="filters.limit === 36 ? 'active' : ''"
              @click="
                filters.limit === 36
                  ? null
                  : setNewFilter({ key: 'limit', value: 36 })
              "
            >
              36
            </div>
            <div
              class="filter-count__item"
              :class="filters.limit === 72 ? 'active' : ''"
              @click="
                filters.limit === 72
                  ? null
                  : setNewFilter({ key: 'limit', value: 72 })
              "
            >
              72
            </div>
            <div
              class="filter-count__item"
              :class="filters.limit === 100000 ? 'active' : ''"
              @click="
                filters.limit === 100000
                  ? null
                  : setNewFilter({ key: 'limit', value: 100000 })
              "
            >
              Все
            </div>
          </div>
        </div>
        <v-products-list :products="products" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VProductsFilters from '@/components/VProductsFilters'
import VProductsList from '@/components/VProductsList'

export default {
  components: {
    VProductsList,
    VProductsFilters,
  },
  async asyncData({ $axios, params }) {
    const titlePage = params.category
    const filters = {
      gender: params.gender || '',
      category: params.category || '',
      brand: [],
      size: [],
      limit: 12,
    }
    const productsData = await $axios.get('/products', {
      params: {
        ...filters,
      },
    })
    return {
      filtersValue: {
        sizes: [],
        brands: [],
      },
      products: productsData.data.products,
      filters,
      titlePage,
    }
  },
  data: () => {
    return {
      filtersValue: {},
      products: [],
      filters: {},
      titlePage: '',
      limit: 12,
    }
  },
  computed: {
    ...mapGetters({ categories: 'codeBooks/categories' }),
    getTitlePage() {
      return this.categories.find((el) => el._id === this.titlePage)?.name || ''
    },
  },
  methods: {
    async getData() {
      const productsData = await this.$axios.get('/products', {
        params: {
          limit: 25,
          ...this.filters,
        },
      })
      this.filtersValue = {
        sizes: [],
        brands: [],
      }
      this.products = productsData.data.products
    },
    clearFilters() {
      this.filters = {
        filtersValue: {},
        products: [],
        filters: {},
        titlePage: '',
        limit: 12,
      }
      this.getData()
    },
    setNewFilter({ key, value }) {
      this.filters[key] = value
      if (key === 'category') {
        this.$router.push(
          `/${this.filters.gender}${
            this.filters.category ? '/' + this.filters.category : ''
          }`
        )
      } else {
        this.getData()
      }
    },
  },
}
</script>
