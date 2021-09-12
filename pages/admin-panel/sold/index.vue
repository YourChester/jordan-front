<template>
  <div class="sold">
    <h1>Продажи</h1>
    <div class="sold__filter">
      <div>
        <select v-model="payload.seller" @change="getList">
          <option value="">выберите продавца</option>
          <option
            v-for="seller in getOnlySeller"
            :key="seller._id"
            :value="seller._id"
          >
            {{ seller.name }}
          </option>
        </select>
      </div>
      <div>
        <button @click="$router.push('/admin-panel/sold/new-sold')">
          Добавить продажу
        </button>
      </div>
    </div>
    <div class="sold__table-wrapper">
      <table class="sold__table">
        <tr>
          <th rowspan="2">Продавец</th>
          <th rowspan="2">Карта покупателя</th>
          <th rowspan="2">Дата продажи</th>
          <th rowspan="2">Сумма продажи</th>
          <th v-show="getRoleKey === 'admin'" rowspan="2">Доход</th>
          <th colspan="3">Действия</th>
        </tr>
        <tr>
          <th>Ред.</th>
          <th>Удал.</th>
        </tr>
        <template v-for="item in solds">
          <tr :key="item._id" style="background-color: grey; color: white">
            <td>Касса:</td>
            <td>
              {{ item.totalPrice }}
              р.
            </td>
            <td colspan="5">{{ item._id }}</td>
          </tr>
          <template v-for="sold in item.solds">
            <tr :key="sold._id">
              <td>
                {{
                  sold.seller_info && sold.seller_info.length
                    ? sold.seller_info.map((el) => el.name).join(', ')
                    : ''
                }}
              </td>
              <td>
                {{
                  sold.card_info && sold.card_info.length
                    ? sold.card_info.map((el) => el.code).join(', ')
                    : ''
                }}
              </td>
              <td>
                {{ getFormatedDateWithTime(sold.date) }}
              </td>
              <td>
                {{ sold.totalPrice }}
              </td>
              <td v-show="getRoleKey === 'admin'">
                {{ sold.totalIncome }}
              </td>
              <td>
                <NuxtLink
                  class="link"
                  :to="`/admin-panel/sold/${sold._id}`"
                  tag="div"
                >
                  E
                </NuxtLink>
              </td>
              <td>
                <button class="link" @click="deleteSold(sold._id)">X</button>
              </td>
            </tr>
          </template>
          <tr :key="item._id + new Date()">
            <td colspan="7"></td>
          </tr>
        </template>
      </table>
    </div>
    <div class="sold__pagination">
      <div class="sold__pagination-perpage">
        <select v-model="perPage" @change="getNewPerPage">
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div class="sold__pagination-total">Всего: {{ totalCount }}</div>
      <div v-show="totalPages > 1" class="sold__pagination-page_control">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDateWithTime, getFormatedDate } from '@/assets/utils/date'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const {
        data: { solds, totalCount, totalPages },
      } = await $axios.get('/admin/solds', {
        params: {
          sellers: '',
          limit: 100,
          page: 1,
        },
      })

      return {
        currentPage: 1,
        perPage: 100,
        totalCount,
        totalPages,
        solds,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  data() {
    return {
      payload: {
        seller: '',
      },
      debounceSerch: null,
    }
  },
  computed: {
    ...mapGetters({
      sellers: 'codeBooks/sellers',
      categories: 'codeBooks/categories',
    }),
    getOnlySeller() {
      return this.sellers.filter((el) => el.role.key === 'manager')
    },
    getRoleKey() {
      const { role } = this.$auth.$state.user
      return role?.key
    },
  },
  watch: {
    currentPage() {
      this.getList()
    },
  },
  methods: {
    getCategoryName(id) {
      return this.categories.find((el) => el._id === id)?.name || ''
    },
    getFormatedDateWithTime(date) {
      return getDateWithTime(date)
    },
    getDate(date) {
      return getFormatedDate(date)
    },
    getNewPerPage() {
      this.currentPage = 1
      this.getList()
    },
    async getList() {
      try {
        const {
          data: { solds, totalCount, totalPages },
        } = await this.$axios.get('/admin/solds', {
          params: {
            seller: this.payload.seller,
            limit: this.perPage,
            page: this.currentPage,
          },
        })
        this.solds = solds
        this.totalCount = totalCount
        this.totalPages = totalPages
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async deleteSold(id) {
      try {
        await this.$axios.delete(`/admin/solds/${id}`)
        this.getList()
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sold {
  padding: 20px;

  &__filter {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__table {
    border-spacing: 0;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;

      .link {
        text-decoration: underline;
        cursor: pointer;
        border: none;
        background-color: transparent;
      }
    }

    &-wrapper {
      margin-top: 15px;
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
}
</style>
