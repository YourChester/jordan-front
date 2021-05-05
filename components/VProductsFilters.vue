<template>
  <div class="products-filters__wrapper">
    <div class="products-filters">
      <div
        v-show="isFiltersEmpty"
        class="products-filters__filters-active_card"
      >
        <div class="products-filters__title">
          <h1>Фильтры</h1>
        </div>
        <div class="products-filters__filters-active">
          <div v-show="filters.gender" class="filters-active__gender">
            Пол: {{ filters.gender }}
          </div>
          <div v-show="filters.category" class="filters-active__category">
            Категория: {{ filters.category }}
          </div>
          <div v-show="filters.brand" class="filters-active__brand">
            Бренд: {{ filters.brand }}
          </div>
        </div>
        <div class="products-filters__filters-clear" @click="clearFilters">
          Очистить фильтры
        </div>
      </div>
      <div class="products-filters__filters-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isFiltersEmpty() {
      let haveSomeFilters = false
      for (const key in this.filters) {
        if (this.filters[key]) {
          haveSomeFilters = true
        }
      }
      return haveSomeFilters
    },
  },
  methods: {
    clearFilters() {
      this.$emit('clear')
    },
  },
}
</script>

<style lang="scss" scoped>
.products-filters {
  &__wrapper {
    width: 100%;
  }

  &__filters-active {
    font-size: 18px;
    padding: 5px 10px;
    background-color: #f3f3f3;
  }

  &__filters-clear {
    cursor: pointer;
    padding: 5px;
    text-align: right;
    font-size: 16px;
  }

  &__title {
    padding: 5px 10px;
    background-color: black;

    h1 {
      color: white;
      margin: 0;
    }
  }
}
</style>
