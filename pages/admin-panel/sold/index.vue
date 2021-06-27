<template>
  <div class="sold">
    <h1>Продажи</h1>
    <div class="sold__filter"></div>
    <div class="sold__table-wrapper">
      <table class="sold__table">
        <tr>
          <th rowspan="2">Продавец</th>
          <th rowspan="2">Карта покупателя</th>
          <th rowspan="2">Дата продажи</th>
          <th rowspan="2">Сумма продажи</th>
          <th colspan="2">Действия</th>
        </tr>
        <tr>
          <th>Прос.</th>
          <th>Ред.</th>
        </tr>
        <tr v-for="sold in solds" :key="sold._id">
          <td>
            {{ sold.map((el) => el.name).join(', ') }}
          </td>
          <td>
            {{ sold.card.code }}
          </td>
          <td>
            {{ sold.data }}
          </td>
          <td>
            {{ sold.totalPrice }}
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  asyncData({ $axios }) {
    // const soldsData = await $axios.get('/admin/solds', {
    //   params: {
    //     limit: 10,
    //     page: 1,
    //   },
    // })
    return {
      currentPage: 1,
      totalCount: 10, // soldsData.data.totalCount
      totalPages: 1, // soldsData.data.totalPages
      solds: [], // soldsData.data.products
    }
  },
  data() {
    return {
      debounceSerch: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.sold {
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
      }
    }

    &-wrapper {
      margin-top: 15px;
    }
  }
}
</style>
