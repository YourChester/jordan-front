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
          <th colspan="3">Действия</th>
        </tr>
        <tr>
          <th>Ред.</th>
          <th>Удал.</th>
        </tr>
        <tr v-for="sold in solds" :key="sold._id">
          <td>
            {{ sold.seller.map((el) => el.name).join(', ') }}
          </td>
          <td>
            {{ sold.card ? sold.card.code : '' }}
          </td>
          <td>
            {{ getFormatedDate(sold.date) }}
          </td>
          <td>
            {{ sold.totalPrice }}
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
          <td><button class="link" @click="deleteSold(sold._id)">X</button></td>
        </tr>
      </table>
    </div>
    <div class="sold__pagination">
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
import { getDateWithTime } from '@/assets/utils/date'

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
        totalCount,
        totalPages,
        solds,
      }
    } catch (e) {
      console.log(e)
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
    }),
    getOnlySeller() {
      return this.sellers.filter((el) => el.role.key === 'manager')
    },
  },
  watch: {
    currentPage() {
      this.getList()
    },
  },
  methods: {
    getFormatedDate(date) {
      return getDateWithTime(date)
    },
    async getList() {
      try {
        const {
          data: { solds, totalCount, totalPages },
        } = await this.$axios.get('/admin/solds', {
          params: {
            seller: this.payload.seller,
            limit: 100,
            page: this.currentPage,
          },
        })
        this.solds = solds
        this.totalCount = totalCount
        this.totalPages = totalPages
      } catch (e) {
        console.log(e)
      }
    },
    async deleteSold(id) {
      try {
        await this.$axios.delete(`/admin/solds/${id}`)
        this.getList()
      } catch (e) {
        console.log(e)
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
    &-total {
      padding: 10px 0;
      font-size: 16px;
    }

    &-page_control {
      cursor: pointer;
      display: flex;

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
