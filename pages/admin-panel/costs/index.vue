<template>
  <div class="costs">
    <h1>Расходы</h1>
    <NuxtLink class="addBtn" :to="`/admin-panel/costs/new`">
      Добавить
    </NuxtLink>
    <table cellpadding="0" cellspacing="0" class="costs__table">
      <tbody>
        <tr>
          <th>Название</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th colspan="2">Управление</th>
        </tr>
        <tr v-for="cost in costs" :key="cost._id">
          <td>
            {{ cost.name }}
          </td>
          <td>
            {{ cost.sum }}
          </td>
          <td>
            {{ getCurrentDate(cost.date) }}
          </td>
          <td>
            <NuxtLink :to="`/admin-panel/costs/new?id=${cost._id}`">
              Добавить
            </NuxtLink>
          </td>
          <td>
            <button @click="deleteCosts(cost._id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="costs__pagination">
      <div class="costs__pagination-perpage">
        <select v-model="perPage" @change="getNewPerPage">
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div class="costs__pagination-total">
        Всего на складе: {{ totalCount }}
      </div>
      <div v-show="totalPages > 1" class="costs__pagination-page_control">
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
import { getFormatedDate } from '@/assets/utils/date'

export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const costsData = await $axios.get('/admin/costs', {
        params: {
          limit: 10,
          page: 1,
        },
      })
      return {
        currentPage: 1,
        perPage: 10,
        totalCount: costsData.data.totalCount,
        totalPages: costsData.data.totalPages,
        costs: costsData.data.costs,
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    getCurrentDate(date) {
      return getFormatedDate(date)
    },
    getNewPerPage() {
      this.currentPage = 1
      this.getList()
    },
    async getList() {
      const costsData = await this.$axios.get('/admin/costs', {
        params: {
          limit: this.perPage,
          page: this.currentPage,
        },
      })
      this.totalCount = costsData.data.totalCount
      this.totalPages = costsData.data.totalPages
      this.costs = costsData.data.costs
    },
    async deleteCosts(id) {
      try {
        await this.$axios.delete(`/admin/costs/${id}`)
        this.getList()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.costs {
  padding: 20px;
  position: relative;

  .addBtn {
    display: block;
    margin-top: 20px;
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__table {
    margin-top: 20px;
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

      a,
      button {
        color: black;
        background-color: transparent;
        border: none;
        outline: none;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
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
}
</style>
