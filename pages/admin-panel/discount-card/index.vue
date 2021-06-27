<template>
  <div class="discount-card">
    <h1>Дисконтрые карты</h1>
    <div class="discount-card__table-wrapper">
      <table class="discount-card__table">
        <tr>
          <th rowspan="2">№</th>
          <th rowspan="2">ФИО</th>
          <th rowspan="2">Телефон</th>
          <th colspan="2">Даты</th>
          <th rowspan="2">Скидка</th>
          <th rowspan="2">Сумма покупок</th>
          <th colspan="2">Действия</th>
        </tr>
        <tr>
          <th>Рождения</th>
          <th>Выдачи</th>
          <th>Ред.</th>
          <th>Удал.</th>
        </tr>
        <tr></tr>
        <tr v-for="card in discountCards" :key="card._id">
          <td>
            {{ card.code }}
          </td>
          <td>
            {{ card.name }}
          </td>
          <td>
            {{ card.phone }}
          </td>
          <td>
            {{ card.birthday }}
          </td>
          <td>
            {{ getCurrentDate(card.createAt) }}
          </td>
          <td>
            {{ card.discount }}
          </td>
          <td>
            {{ card.totalPrice || 0 }}
          </td>
          <td>
            <NuxtLink
              class="link"
              :to="`/admin-panel/discount-card/${card._id}`"
              tag="div"
            >
              E
            </NuxtLink>
          </td>
          <td>
            <button class="link" @click="deleteCard(card._id)">X</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="discount-card__pagination">
      <div class="discount-card__pagination-total">
        Всего на складе: {{ totalCount }}
      </div>
      <div
        v-show="totalPages > 1"
        class="discount-card__pagination-page_control"
      >
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
import { getDateWithTime } from '@/assets/utils/date'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const discountCardsData = await $axios.get('/admin/discount-cards', {
      params: {
        limit: 100,
        page: 1,
      },
    })
    return {
      currentPage: 1,
      totalCount: discountCardsData.data.totalCount,
      totalPages: discountCardsData.data.totalPages,
      discountCards: discountCardsData.data.discountCards,
    }
  },
  data() {
    return {
      debounceSerch: null,
    }
  },
  watch: {
    currentPage() {
      this.getList()
    },
  },
  methods: {
    getCurrentDate(data) {
      return getDateWithTime(data)
    },
    async getList() {
      const {
        data: { discountCards, totalCount, totalPages },
      } = await this.$axios.get('/admin/discount-cards', {
        params: {
          limit: 100,
          page: this.currentPage,
        },
      })
      this.discountCards = discountCards
      this.totalCount = totalCount
      this.totalPages = totalPages
    },
    async deleteCard(id) {
      await this.$axios.delete(`/admin/discount-cards/${id}`)
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.discount-card {
  padding: 20px;

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
