<template>
  <div class="products-filters__wrapper">
    <div class="products-filters">
      <div
        v-show="isFiltersEmpty"
        class="products-filters__filters-active_card"
      >
        <div class="products-filters__title">
          <h1>Фильтры</h1>
          <div
            class="products-filters__title-btn"
            @click="openFilter = !openFilter"
          >
            <svg
              height="20px"
              version="1.1"
              viewBox="0 0 128 128"
              width="20px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <line
                  :style="`stroke: #fff;stroke-width: 12;stroke-linecap: square;stroke-miterlimit: 10;`"
                  x1="111"
                  x2="64"
                  y1="40.5"
                  y2="87.499"
                />
                <line
                  :style="`stroke: #fff;stroke-width: 12;stroke-linecap: square;stroke-miterlimit: 10;`"
                  x1="64"
                  x2="17"
                  y1="87.499"
                  y2="40.5"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="products-filters__filters-active">
          <div
            v-show="filters.gender && filters.gender !== 'all'"
            class="filters-active__gender"
          >
            <div>Пол: {{ getGendersName }}</div>
            <div>
              <img
                src="~/assets/img/close.svg"
                width="12"
                height="12"
                @click="$emit('set-filter', { key: 'gender', value: '' })"
              />
            </div>
          </div>
          <div v-show="filters.category" class="filters-active__category">
            <div>Категория: {{ getCategoryName }}</div>
            <div>
              <img
                src="~/assets/img/close.svg"
                width="12"
                height="12"
                @click="$emit('set-filter', { key: 'category', value: '' })"
              />
            </div>
          </div>
          <div v-show="filters.brand.length" class="filters-active__brand">
            <div>Бренд: {{ filters.brand.join(', ') }}</div>
            <div>
              <img
                src="~/assets/img/close.svg"
                width="12"
                height="12"
                @click="$emit('set-filter', { key: 'brand', value: [] })"
              />
            </div>
          </div>
        </div>
        <div class="products-filters__filters-clear" @click="clearFilters">
          Очистить фильтры
        </div>
      </div>
      <div v-show="openFilter" class="products-filters__filters-mobile-list">
        <div class="products-filters__group products-filters__category">
          <div class="products-filters__group-title category__title">Пол</div>
          <div class="products-filters__group-list category__list">
            <template v-for="genders in genders">
              <label
                v-if="isHaveFilterSize ? genders._id === filters.genders : true"
                :key="genders._id"
                class="products-filters__group-item category__item"
              >
                <input
                  v-model="gendersData"
                  type="radio"
                  name="genders"
                  :value="genders._id"
                />
                {{ genders.name }}
              </label>
            </template>
          </div>
        </div>
        <div class="products-filters__group products-filters__category">
          <div class="products-filters__group-title category__title">
            Категории
          </div>
          <div class="products-filters__group-list category__list">
            <template v-for="category in getCategories">
              <label
                v-if="
                  isHaveFilterSize ? category._id === filters.category : true
                "
                :key="category._id"
                class="products-filters__group-item category__item"
              >
                <input
                  v-model="categoryData"
                  type="radio"
                  name="category"
                  :value="category._id"
                />
                {{ category.name }}
              </label>
            </template>
          </div>
        </div>
        <div
          v-show="filtersValue.sizes.length"
          class="products-filters__group products-filters__size"
        >
          <div class="products-filters__group-title size__title">Размеры</div>
          <div class="size__list">
            <div
              v-for="size in filtersValue.sizes"
              v-show="size"
              :key="size"
              :class="isSizeIncludes(size) ? 'active' : ''"
              class="size__item"
              @click="selectSize(size)"
            >
              {{ size }}
            </div>
          </div>
        </div>
        <div
          v-show="filtersValue.brands.length"
          class="products-filters__group products-filters__brand"
        >
          <div class="products-filters__group-title brand__title">Бренд</div>
          <div class="brand__list">
            <label
              v-for="brandName in filtersValue.brands"
              :key="brandName"
              class="brand__item"
            >
              <input
                v-model="brandData"
                type="checkbox"
                name="brand"
                :value="brandName"
              />
              {{ brandName }}
            </label>
          </div>
        </div>
      </div>
      <div class="products-filters__filters-list">
        <div class="products-filters__group products-filters__category">
          <div class="products-filters__group-title category__title">Пол</div>
          <div class="products-filters__group-list category__list">
            <template v-for="genders in genders">
              <label
                v-if="isHaveFilterSize ? genders._id === filters.genders : true"
                :key="genders._id"
                class="products-filters__group-item category__item"
              >
                <input
                  v-model="gendersData"
                  type="radio"
                  name="genders"
                  :value="genders._id"
                />
                {{ genders.name }}
              </label>
            </template>
          </div>
        </div>
        <div class="products-filters__group products-filters__category">
          <div class="products-filters__group-title category__title">
            Категории
          </div>
          <div class="products-filters__group-list category__list">
            <template v-for="category in getCategories">
              <label
                v-if="
                  isHaveFilterSize ? category._id === filters.category : true
                "
                :key="category._id"
                class="products-filters__group-item category__item"
              >
                <input
                  v-model="categoryData"
                  type="radio"
                  name="category"
                  :value="category._id"
                />
                {{ category.name }}
              </label>
            </template>
          </div>
        </div>
        <div
          v-show="filtersValue.sizes.length"
          class="products-filters__group products-filters__size"
        >
          <div class="products-filters__group-title size__title">Размеры</div>
          <div class="size__list">
            <div
              v-for="size in filtersValue.sizes"
              v-show="size"
              :key="size"
              :class="isSizeIncludes(size) ? 'active' : ''"
              class="size__item"
              @click="selectSize(size)"
            >
              {{ size }}
            </div>
          </div>
        </div>
        <div
          v-show="filtersValue.brands.length"
          class="products-filters__group products-filters__brand"
        >
          <div class="products-filters__group-title brand__title">Бренд</div>
          <div class="brand__list">
            <label
              v-for="brandName in filtersValue.brands"
              :key="brandName"
              class="brand__item"
            >
              <input
                v-model="brandData"
                type="checkbox"
                name="brand"
                :value="brandName"
              />
              {{ brandName }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          gender: '',
          category: '',
          brand: [],
          size: [],
          limit: 12,
        }
      },
    },
    filtersValue: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => {
    return {
      openFilter: false,
      brandData: [],
      sizeData: [],
      categoryData: '',
      gendersData: '',
    }
  },
  computed: {
    ...mapGetters({
      categories: 'codeBooks/categories',
      genders: 'codeBooks/genders',
    }),
    isFiltersEmpty() {
      let haveSomeFilters = false
      for (const key in this.filters) {
        if (this.filters[key]) {
          haveSomeFilters = true
        }
      }
      return haveSomeFilters
    },
    getCategoryName() {
      return (
        this.categories.find((el) => el?._id === this.filters.category)?.name ||
        ''
      )
    },
    getGendersName() {
      return (
        this.genders.find((el) => el?._id === this.filters?.gender)?.name || ''
      )
    },
    isHaveFilterSize() {
      return this.sizeData?.length || 0
    },
    getCategories() {
      const result = []
      const category = this.categories.find(
        (el) => el._id === this.filters.category
      )

      if (category?.parent) {
        this.categories.forEach((el) => {
          if (el?.parent?._id === category?.parent?._id) {
            result.push(el)
          }
        })
      } else {
        this.categories.forEach((el) => {
          if (el?.parent?._id === category?._id) {
            result.push(el)
          }
        })
      }
      return result
    },
  },
  watch: {
    brandData(newVal) {
      this.$emit('set-filter', { key: 'brand', value: newVal })
    },
    categoryData(newVal) {
      this.$emit('set-filter', { key: 'category', value: newVal })
    },
    gendersData(newVal) {
      this.$emit('set-filter', { key: 'gender', value: newVal })
    },
  },
  created() {
    this.categoryData = this.filters.category
    this.brandData = this.filters.brand
    this.sizeData = this.filters.size
    this.gendersData = this.filters.gender
  },
  methods: {
    clearFilters() {
      this.$emit('clear')
    },
    selectSize(size) {
      if (this.sizeData.includes(size)) {
        const index = this.sizeData.indexOf(size)
        this.sizeData.splice(index, 1)
        this.$emit('set-filter', { key: 'size', value: this.sizeData })
      } else {
        this.sizeData.push(size)
        this.$emit('set-filter', { key: 'size', value: this.size })
      }
    },
    isSizeIncludes(size) {
      return this.sizeData?.includes(size) || false
    },
  },
}
</script>

<style lang="scss" scoped>
.products-filters {
  position: relative;

  &__wrapper {
    width: 100%;
  }

  &__filters-active {
    font-size: 18px;
    padding: 5px 10px;
    background-color: #f3f3f3;

    .filters-active {
      &__gender,
      &__category,
      &__brand {
        padding: 8px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  &__filters-mobile-list {
    width: 100%;
    padding: 0 30px;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    background-color: white;

    @media (max-width: 960px) {
      display: block;
    }
  }

  &__filters-list {
    @media (max-width: 960px) {
      display: none;
    }
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

    @media (max-width: 960px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      color: white;
    }

    &-btn {
      display: none;

      @media (max-width: 960px) {
        display: block;
      }
    }
  }

  &__group {
    margin-top: 20px;

    &-title {
      padding: 10px;
      background-color: #5fc9cb;
      font-size: 20px;
      font-weight: 600;
      color: white;
    }

    &-item {
      display: block;
      margin: 5px;
      padding: 5px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  &__size {
    .size {
      &__list {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
      }

      &__item {
        margin: 5px;
        padding: 5px;
        border: 2px solid black;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          background-color: #5fc9cb;
          color: white;
        }

        &.active {
          background-color: #5fc9cb;
          color: white;
        }
      }
    }
  }

  &__brand {
    .brand {
      &__item {
        display: block;
        margin: 5px;
        padding: 5px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
}
</style>
