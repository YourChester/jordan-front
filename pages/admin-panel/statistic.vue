<template>
  <div class="statistic">
    <client-only>
      <h1>Статистика</h1>
      <div class="statistic__tables">
        <div class="statistic__table-wrapper">
          <table class="statistic__table">
            <tr>
              <td>Менеджер</td>
              <td>№ продаж</td>
              <td>Сумма</td>
              <td>Доход</td>
            </tr>
            <template v-for="el in statistic">
              <tr :key="el.staartDate" @click="el.visible = !el.visible">
                <td colspan="4">
                  {{ getCurrentDate(el.staartDate) }} -
                  {{ getCurrentDate(el.endDate) }}
                </td>
              </tr>
              <tr
                v-for="seller in getOnlySeller"
                v-show="el.visible"
                :key="seller._id + el.staartDate"
              >
                <td>{{ seller.name }}</td>
                <td>
                  {{ getCountSold(el.sold, seller._id) }}
                </td>
                <td>
                  {{ getSummSoldPrice(el.sold, seller._id) }}
                </td>
                <td>
                  {{ getSummSoldIncomePrice(el.sold, seller._id) }}
                </td>
              </tr>
              <tr v-show="el.visible" :key="'total' + el.staartDate">
                <td>Итог</td>
                <td>{{ el.sold.length }}</td>
                <td>
                  {{
                    el.sold.reduce(
                      (sum, solder) => (sum += Number(solder.totalPrice)),
                      0
                    )
                  }}
                </td>
                <td>
                  {{
                    el.sold.reduce(
                      (sum, solder) => (sum += Number(solder.totalIncome)),
                      0
                    )
                  }}
                </td>
              </tr>
            </template>
            <tr>
              <td colspan="4">Итог</td>
            </tr>
            <tr v-for="seller in getOnlySeller" :key="seller._id">
              <td>{{ seller.name }}</td>
              <td>
                {{ getCountSold(solds, seller._id) }}
              </td>
              <td>
                {{ getSummSoldPrice(solds, seller._id) }}
              </td>
              <td>
                {{ getSummSoldIncomePrice(solds, seller._id) }}
              </td>
            </tr>
            <tr>
              <td>Итог</td>
              <td>{{ solds.length }}</td>
              <td>
                {{
                  solds.reduce(
                    (sum, solder) => (sum += Number(solder.totalPrice)),
                    0
                  )
                }}
              </td>
              <td>
                {{
                  solds.reduce(
                    (sum, solder) => (sum += Number(solder.totalIncome)),
                    0
                  )
                }}
              </td>
            </tr>
          </table>
        </div>
        <div class="statistic-month__table-wrapper">
          <table class="statistic-month__table">
            <tr>
              <td>Кол-во</td>
              <td>Сумма</td>
              <td>Расходы</td>
              <td>Доход</td>
              <td>Прибыль</td>
            </tr>
            <template v-for="item in monthStatistic">
              <tr :key="item.monthId + item.year">
                <td colspan="5">
                  {{ getCurrentMonthName(item.monthId) }} {{ item.year }}
                </td>
              </tr>
              <tr :key="item.monthId + item.year">
                <td>{{ item.sold.length }}</td>
                <td>
                  {{
                    item.sold.reduce(
                      (sum, solder) => (sum += Number(solder.totalPrice)),
                      0
                    )
                  }}
                </td>
                <td>
                  {{
                    item.cost.reduce(
                      (sum, solder) => (sum += Number(solder.sum)),
                      0
                    )
                  }}
                </td>
                <td>
                  {{
                    item.sold.reduce(
                      (sum, solder) => (sum += Number(solder.totalIncome)),
                      0
                    )
                  }}
                </td>
                <td>
                  {{
                    item.sold.reduce(
                      (sum, solder) => (sum += Number(solder.totalIncome)),
                      0
                    ) -
                    item.cost.reduce(
                      (sum, solder) => (sum += Number(solder.sum)),
                      0
                    )
                  }}
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getFormatedDate, getMonthName } from '@/assets/utils/date'

export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const {
        data: { statistic, solds },
      } = await $axios.get('/admin/statistic')

      const {
        data: { monthStatistic },
      } = await $axios.get('/admin/statistic/month')

      return {
        currentPage: 1,
        perPage: 100,
        statistic,
        solds,
        monthStatistic,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  computed: {
    ...mapGetters({
      sellers: 'codeBooks/sellers',
    }),
    getOnlySeller() {
      return this.sellers.filter(
        (el) => el.role.key === 'manager' || el.role.key === 'super_manager'
      )
    },
  },
  methods: {
    getCurrentMonthName(index) {
      return getMonthName(index)
    },
    getCurrentDate(date) {
      return getFormatedDate(date)
    },
    getCountSold(solds, sellerId) {
      return solds.filter((sold) => sold.seller.includes(sellerId)).length
    },
    getSummSoldPrice(solds, sellerId) {
      const sellerSolds = solds.filter((sold) => sold.seller.includes(sellerId))
      const summ = sellerSolds.reduce(
        (sum, el) => (sum += Number(el.totalPrice / el.seller.length)),
        0
      )
      return summ
    },
    getSummSoldIncomePrice(solds, sellerId) {
      const sellerSolds = solds.filter((sold) => sold.seller.includes(sellerId))
      const summ = sellerSolds.reduce(
        (sum, el) => (sum += Number(el.totalIncome / el.seller.length)),
        0
      )
      return summ
    },
  },
}
</script>

<style lang="scss" scoped>
.statistic {
  padding: 20px;
  position: relative;

  &__tables {
    display: flex;
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
      margin-right: 20px;
    }
  }

  &-month {
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
  }
}
</style>
