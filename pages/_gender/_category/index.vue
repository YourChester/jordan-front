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
        <div>
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
          <div class="right-side">
            <div
              class="right-side__sort"
              @mouseover="visibleSort = true"
              @mouseleave="visibleSort = false"
            >
              Сортировать: {{ getSortName }}
              <div v-show="visibleSort" class="right-side__sort-menu">
                <button @click="setSort('prise')">цена по убыванию</button>
                <button @click="setSort('prise-reverse')">
                  цена по возростанию
                </button>
                <button @click="setSort('dicount')">акции</button>
                <button @click="setSort('name-reverse')">
                  по названию Я-А
                </button>
                <button @click="setSort('name')">по названию А-Я</button>
                <button @click="setSort('')">по умолчанию</button>
              </div>
            </div>
            <div v-show="totalPages > 1" class="right-side__paginations">
              <div
                v-show="currentPage > 1"
                @click="currentPage = currentPage - 1"
              >
                &lt;
              </div>
              <div
                v-show="currentPage > 8"
                @click="currentPage = getListPage[0] - 1"
              >
                ...
              </div>
              <div
                v-for="page in getListPage"
                :key="page"
                :class="currentPage === page ? 'active' : ''"
                @click="currentPage = page"
              >
                {{ page }}
              </div>
              <div
                v-show="totalPages > 8 && totalPages - currentPage > 8"
                @click="currentPage = getListPage[getListPage.length - 1] + 1"
              >
                ...
              </div>
              <div
                v-show="currentPage < totalPages"
                @click="currentPage = currentPage + 1"
              >
                &gt;
              </div>
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
        sort: '',
        limit: 12,
        page: 1,
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
        currentPage: 1,
        totalCount: productsData.data.totalCount,
        totalPages: productsData.data.totalPages,
        filters,
        titlePage,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  data: () => {
    return {
      filtersValue: {},
      products: [],
      filters: {},
      titlePage: '',
      visibleSort: false,
    }
  },
  computed: {
    ...mapGetters({ categories: 'codeBooks/categories' }),
    getSortName() {
      switch (this.filters.sort) {
        case 'dicount':
          return 'акции'
        case 'prise-reverse':
          return 'цена по убыванию'
        case 'prise':
          return 'цена по возростанию'
        case 'name-reverse':
          return 'по названию Я-А'
        case 'name':
          return 'по названию А-Я'
        default:
          return 'по умолчанию'
      }
    },
    getTitlePage() {
      return this.categories.find((el) => el._id === this.titlePage)?.name || ''
    },
    getListPage() {
      if (this.totalPages === 1) {
        return
      }
      const pages = []
      if (this.currentPage <= 8) {
        for (let i = 1; i <= this.totalPages; i++) {
          if (i <= 8) {
            pages.push(i)
          } else {
            break
          }
        }
      } else if (this.totalPages - this.currentPage < 8) {
        for (
          let i = this.totalPages - this.currentPage;
          i < this.totalPages;
          i++
        ) {
          if (i <= 8) {
            pages.push(i)
          } else {
            break
          }
        }
      } else {
        for (let i = this.currentPage - 3; i < this.totalPages; i++) {
          if (i <= this.currentPage + 3) {
            pages.push(i)
          } else {
            break
          }
        }
      }
      return pages
    },
  },
  watch: {
    currentPage() {
      this.getData()
    },
  },
  methods: {
    async getData() {
      try {
        const productsData = await this.$axios.get('/products', {
          params: {
            ...this.filters,
            page: this.currentPage,
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
        this.totalPages = productsData.data.totalPages
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    clearFilters() {
      this.$router.push(`/all`)
    },
    setSort(key) {
      this.filters.sort = key
      this.currentPage = 1
      this.getData()
    },
    setNewFilter({ key, value }) {
      this.filters[key] = value
      if (key === 'category') {
        if (value) {
          this.$router.push(
            `/${this.filters.gender}${
              this.filters.category ? '/' + this.filters.category : ''
            }`
          )
        } else if (this.filters.gender !== 'all') {
          this.$router.push(
            `/${this.filters.gender}${
              this.filters.category ? '/' + this.filters.category : ''
            }`
          )
        } else {
          this.$router.push(`/`)
        }
      } else if (key === 'gender') {
        if (value) {
          this.$router.push(
            `/${this.filters.gender}${
              this.filters.category ? '/' + this.filters.category : ''
            }`
          )
        } else {
          this.$router.push(
            `/all${this.filters.category ? '/' + this.filters.category : ''}`
          )
        }
      } else {
        this.currentPage = 1
        this.getData()
      }
    },
  },
}
</script>
