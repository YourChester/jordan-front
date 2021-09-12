<template>
  <div class="discount-card">
    <h1>Дисконтная карта</h1>
    <div class="discount-card__body">
      <div>ФИО: {{ discountCard ? discountCard.name : '' }}</div>
      <div>Телефон: {{ discountCard ? discountCard.phone : '' }}</div>
      <div>Скидка: {{ discountCard ? discountCard.discount : '' }}</div>
    </div>
    <div v-if="discountCard">
      <table cellpadding="0" cellspacing="0" class="discount-card__products">
        <tbody>
          <tr>
            <th rowspan="2">Тип</th>
            <th rowspan="2">Бренд</th>
            <th rowspan="2">Название</th>
            <th rowspan="2">Цена продажи</th>
            <th rowspan="2">Скидка</th>
            <th rowspan="2">Размер</th>
            <th rowspan="2">Артикул</th>
            <th rowspan="2">Штрих код</th>
            <th rowspan="2">Дата продажи</th>
          </tr>
          <tr></tr>
          <tr v-for="product in discountCard.history" :key="product._id">
            <td>
              {{ getCategoryName(product.category) }}
            </td>
            <td>
              {{ product.brand }}
            </td>
            <td>
              {{ product.name }}
            </td>
            <td>
              {{ product.priseSold }}
            </td>
            <td>
              {{ product.discount }}
            </td>
            <td>
              {{ product.size }}
            </td>
            <td>
              {{ product.articul }}
            </td>
            <td>
              {{ product.codeProduct || product.codeBox }}
            </td>
            <td>
              {{ getCurrentDate(product.dateOut) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getDateWithTime } from '@/assets/utils/date'

export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const discountCardsData = await $axios.get(
        `/admin/discount-cards/${params.id}`
      )
      return {
        discountCard: discountCardsData.data,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  computed: {
    ...mapGetters({
      categories: 'codeBooks/categories',
    }),
  },
  methods: {
    getCategoryName(id) {
      const category = this.categories.find((el) => el._id === id)
      return category ? category.name : ''
    },
    getCurrentDate(data) {
      return getDateWithTime(data)
    },
  },
}
</script>

<style lang="scss" scoped>
.discount-card {
  padding: 20px;

  &__body {
    margin-top: 10px;
  }

  &__products {
    margin-top: 10px;
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

        .pair {
          margin-right: 10px;
        }

        .image {
          margin-left: 10px;
        }
      }

      .table-search {
        width: 100px;
      }
    }
  }
}
</style>
