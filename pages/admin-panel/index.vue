<template>
  <div class="store">
    <h1>Склад</h1>
    <div class="store__table-filter">
      <label class="table-filter__search">
        Поиск
        <input v-model="search" type="text" @input="debounceSerch" />
      </label>
    </div>
    <table cellpadding="0" cellspacing="0" class="store__table-product">
      <tbody>
        <tr>
          <th rowspan="2" width="100px">Тип</th>
          <th rowspan="2" width="80px">Бренд</th>
          <th rowspan="2" width="250px">Название</th>
          <th rowspan="2" width="80px">Цена</th>
          <th rowspan="2" width="60px">Скидка</th>
          <th rowspan="2" width="60px">Размер</th>
          <th rowspan="2" width="150px">Артикул</th>
          <th colspan="2">Штрих код</th>
          <th rowspan="2" width="130px">Дата получения</th>
          <th rowspan="3" width="150px">Пол</th>
          <th rowspan="2" colspan="2">Действия</th>
        </tr>
        <tr>
          <th width="130px">Товара</th>
          <th width="130px">Коробка</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <th>Прих.</th>
          <th>Прав.</th>
        </tr>
        <tr v-for="product in products" :key="product._id">
          <td>
            {{ product.category ? product.category.name : '' }}
          </td>
          <td>
            {{ product.brand }}
          </td>
          <td>
            {{ product.name }}
          </td>
          <td>
            {{ product.priceOut }}
          </td>
          <td>
            {{ product.discount }}
          </td>
          <td>
            {{ product.size }}
          </td>
          <td>
            <div class="articul">
              <div>{{ product.articul }}</div>
              <img
                v-show="product.images && product.images.length"
                src="~/assets/img/image.svg"
                width="15px"
                alt="Картинка"
                @mouseover="visibilityImageModal(product.images[0], true)"
                @mouseleave="visibilityImageModal('', false)"
              />
            </div>
          </td>
          <td>
            {{ product.codeProduct }}
          </td>
          <td>
            {{ product.codeBox }}
          </td>
          <td>
            {{ getCurrentDate(product.dateIn) }}
          </td>
          <td>
            <label v-for="gender in genders" :key="gender._id">
              {{ gender.name[0] }}
              <input
                v-model="product.gender"
                type="checkbox"
                name=""
                :value="gender._id"
                @change="changeGender(product)"
              />
            </label>
          </td>
          <td>
            <NuxtLink
              class="link"
              :to="`/admin-panel/products/new?articul=${product.articul}`"
              tag="div"
            >
              +
            </NuxtLink>
          </td>
          <td>
            <NuxtLink
              class="link"
              :to="`/admin-panel/products/${product._id}`"
              tag="div"
            >
              E
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="store__pagination">
      <div class="store__pagination-perpage">
        <select v-model="perPage" @change="getNewPerPage">
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div class="store__pagination-total">
        Всего на складе: {{ totalCount }}
      </div>
      <div v-show="totalPages > 1" class="store__pagination-page_control">
        <div v-show="currentPage !== 1" @click="currentPage = currentPage - 1">
          &lt;
        </div>
        <div
          v-for="page in totalPages"
          :key="page"
          :class="currentPage === page ? 'active' : ''"
          @click="currentPage = page"
        >
          {{ page }}
        </div>
        <div
          v-show="currentPage !== totalPages"
          @click="currentPage = currentPage + 1"
        >
          &gt;
        </div>
      </div>
    </div>
    <div v-if="modalVisibility" class="store__image-alert">
      <img :src="`${url}${imageUrl}`" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'

import { getDateWithTime } from '@/assets/utils/date'

export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios, redirect, $auth }) {
    try {
      const productsData = await $axios.get('/admin/products', {
        params: {
          limit: 10,
          page: 1,
        },
      })
      return {
        currentPage: 1,
        totalCount: productsData.data.totalCount,
        totalPages: productsData.data.totalPages,
        search: '',
        products: productsData.data.products,
      }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      debounceSerch: null,
      modalVisibility: false,
      imageUrl: '',
      url: process.env.IMG_URL,
    }
  },
  computed: {
    ...mapGetters({
      genders: 'codeBooks/genders',
    }),
  },
  watch: {
    currentPage() {
      this.getList()
    },
  },
  created() {
    this.debounceSerch = debounce(this.getSearch, 1000)
  },
  methods: {
    getCurrentDate(data) {
      return getDateWithTime(data)
    },
    getSearch() {
      this.currentPage = 1
      this.getList()
    },
    getNewPerPage() {
      this.currentPage = 1
      this.getList()
    },
    async getList() {
      try {
        const {
          data: { products, totalCount, totalPages },
        } = await this.$axios.get('/admin/products', {
          params: {
            search: this.search,
            limit: 10,
            page: this.currentPage,
          },
        })
        this.products = products
        this.totalCount = totalCount
        this.totalPages = totalPages
      } catch (e) {
        console.log(e)
      }
    },
    openItem(product) {
      this.$router.push(`/admin-panel/${product._id}`)
    },
    openForEdit(product) {
      this.$router.push(`/admin-panel/${product._id}/edit`)
    },
    visibilityImageModal(imgUrl, state) {
      this.imageUrl = imgUrl
      this.modalVisibility = state
    },
    async changeGender(product) {
      try {
        await this.$axios.put(`/admin/products/${product._id}`, {
          gender: product.gender,
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.store {
  padding: 20px;
  position: relative;

  &__table-filter {
    padding: 10px 0;

    .table-filter {
      &__search {
        width: 200px;
        font-size: 14px;
        font-weight: 600;
        input {
          width: 200px;
          display: block;
          box-sizing: border-box;
          border-radius: 5px;
          border: 2px solid #000;
          padding: 5px;
          font-size: 16px;
          font-weight: 600;
          outline: none;
        }
      }
    }
  }

  &__table-product {
    border-spacing: 0;
    border-collapse: collapse;

    tr {
      &:hover {
        background-color: #eee;
      }
    }

    th,
    td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;

      .link {
        text-decoration: underline;
        cursor: pointer;
      }

      .articul {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          margin-left: 10px;
        }
      }
    }
  }

  &__pagination {
    &-perpage {
      margin-top: 10px;
    }

    &-total {
      padding: 10px 0;
      font-size: 16px;
    }

    &-page_control {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;

      div {
        padding: 5px;

        &.active {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }

  &__image-alert {
    position: fixed;
    top: 100px;
    left: 50px;
    width: 520px;
    height: 520px;
    padding: 10px;
    border: 1px solid black;
    background-color: white;
  }
}
</style>
