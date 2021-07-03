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
          <h1 class="right-side__title">{{ getTitlePage }}</h1>
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
    try {
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
      const filtersSize = await $axios.get('/filters/filter-size', {
        params: {
          ...filters,
        },
      })
      const filtersBrand = await $axios.get('/filters/filter-brand', {
        params: {
          ...filters,
        },
      })
      return {
        filtersValue: {
          sizes: filtersSize.data.sizes,
          brands: filtersBrand.data.brands,
        },
        products: productsData.data.products,
        filters,
        titlePage,
      }
    } catch (e) {
      console.log(e)
    }
  },
  data: () => {
    return {
      filtersValue: {},
      products: [],
      filters: {},
      titlePage: '',
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
      try {
        const productsData = await this.$axios.get('/products', {
          params: {
            limit: 25,
            ...this.filters,
          },
        })
        const filtersSize = await this.$axios.get('/filters/filter-size', {
          params: {
            ...this.filters,
          },
        })
        const filtersBrand = await this.$axios.get('/filters/filter-brand', {
          params: {
            ...this.filters,
          },
        })
        this.filtersValue = {
          sizes: filtersSize.data.sizes,
          brands: filtersBrand.data.brands,
        }
        this.products = productsData.data.products
      } catch (e) {
        console.log(e)
      }
    },
    clearFilters() {
      this.filters = {
        gender: '',
        category: '',
        brand: '',
        size: '',
      }
      this.getData()
    },
    setNewFilter({ key, value }) {
      this.filters[key] = value
      if (key === 'category') {
        this.$router.push(
          `/store/${this.filters.gender}${
            this.filters.category ? '/' + this.filters.category : ''
          }`
        )
      } else if (key === 'gender') {
        this.$router.push(
          `/store/${this.filters.gender}${
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
