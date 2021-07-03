<template>
  <div class="sold-form__wrapper">
    <div class="sold-form">
      <h3>Продавец:</h3>
      <label v-for="seller in getOnlySeller" :key="seller._id" class="seller">
        <input v-model="localSold.seller" type="checkbox" :value="seller._id" />
        {{ seller.name }}
      </label>
      <div class="sold-form__buyer">
        <label>
          Дисконтрая карта
          <input
            v-model="buyer.cardCode"
            type="text"
            @input="debounceSerchCard"
          />
        </label>
        <label>
          ФИО покупателя
          <input v-model="buyer.name" type="text" disabled />
        </label>
        <label>
          Скидка покупателя
          <input v-model="localSold.discount" type="text" disabled />
        </label>
      </div>
      <div class="sold-form__product-list">
        <label>
          Товар
          <input v-model="product" type="text" @input="debounceSerchProduct" />
        </label>
        <table v-show="products.length" class="sold-form__product-table">
          <tr>
            <th rowspan="2" width="100px">Тип</th>
            <th rowspan="2" width="250px">Название</th>
            <th rowspan="2" width="80px">Цена</th>
            <th rowspan="2" width="60px">Размер</th>
            <th colspan="2">Штрих код</th>
            <th rowspan="2">Добавить</th>
          </tr>
          <tr>
            <th width="130px">Товара</th>
            <th width="130px">Коробка</th>
          </tr>
          <tr v-for="item in products" :key="item._id">
            <td>
              {{ item.category ? item.category.name : '' }}
            </td>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.priceOut }}
            </td>
            <td>
              {{ item.size }}
            </td>
            <td>
              {{ item.codeProduct }}
            </td>
            <td>
              {{ item.codeBox }}
            </td>
            <td>
              <button class="link" @click="addProduct(item)">+</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="sold-form__table-wrapper">
        <div>
          <h3>Продаваемый товар на сумму {{ getTotalPrice }}p.</h3>
        </div>
        <table class="sold-form__table">
          <tr>
            <th width="250px">Название</th>
            <th width="120px">Цена витрины</th>
            <th width="120px">Цена продажи</th>
            <th width="120px">Дисконт товара</th>
            <th>{{ localSold._id ? 'Возврат' : 'Удалить' }}</th>
          </tr>
          <tr v-for="(item, index) in localSold.products" :key="item._id">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.priceOut }}
            </td>
            <td>
              <input v-model="item.priseSold" type="text" />
            </td>
            <td>
              {{ item.discount }}
            </td>
            <td>
              <button class="link" @click="deleteProduct(index)">X</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="sold-form__actions">
      <button @click="saveSold">Сохранить</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  props: {
    sold: {
      type: Object,
      default: () => {},
    },
  },
  data: () => {
    return {
      localSold: {
        discount: 0,
        card: null,
        products: [],
        seller: [],
        totalPrice: 0,
        date: '',
      },
      buyer: {
        cardCode: '',
        name: '',
      },
      product: '',
      products: [],
      debounceSerch: null,
      debounceSerchCard: null,
      debounceSerchProduct: null,
    }
  },
  computed: {
    ...mapGetters({
      sellers: 'codeBooks/sellers',
    }),
    getOnlySeller() {
      return this.sellers.filter((el) => el.role.key === 'manager')
    },
    getTotalPrice() {
      const totalPrice = this.localSold.products.reduce((price, el) => {
        const priseSold =
          el.discount < 50 && this.localSold.discount
            ? el.priseSold - (el.priseSold / 100) * this.localSold.discount
            : el.priseSold
        return price + priseSold
      }, 0)

      return Math.round(totalPrice)
    },
  },
  created() {
    this.debounceSerchCard = debounce(this.getDiscountCard, 1000)
    this.debounceSerchProduct = debounce(this.getProduct, 1000)
    this.localSold.date = new Date()
    if (this.sold) {
      this.localSold = {
        ...this.localSold,
        ...this.sold,
      }

      if (this.sold.card) {
        this.buyer.cardCode = this.sold.card.code
        this.buyer.name = this.sold.card.name
      }
    }
  },
  methods: {
    async getDiscountCard() {
      try {
        const discountCardsData = await this.$axios.get(
          '/admin/discount-cards',
          {
            params: {
              code: this.buyer.cardCode,
            },
          }
        )
        const card = discountCardsData.data.discountCards[0]
        this.buyer.name = card.name
        this.localSold.card = card._id
        this.localSold.discount = card.discount
      } catch (e) {
        console.log(e)
      }
    },
    async getProduct() {
      try {
        const {
          data: { products },
        } = await this.$axios.get('/admin/products', {
          params: {
            search: this.product,
            limit: 100,
            page: 1,
          },
        })
        this.products = products
      } catch (e) {
        console.log(e)
      }
    },
    addProduct(product) {
      const localProduct = JSON.parse(JSON.stringify(product))
      const discount = (localProduct.priceOut / 100) * localProduct.discount
      localProduct.dateOut = this.localSold.date
      localProduct.priseSold = localProduct.priceOut - discount
      localProduct.visibility = false

      this.localSold.products.push(localProduct)
      this.products = []
      this.product = ''
    },
    async deleteProduct(index) {
      try {
        if (this.localSold._id) {
          const product = this.localSold.products[index]
          this.localSold.products.splice(index, 1)
          this.localSold.totalPrice = this.getTotalPrice
          await this.$axios.put(
            `/admin/solds/${this.localSold._id}`,
            this.localSold
          )
          await this.$axios.put(`/admin/products/${product._id}`, {
            dateOut: null,
            priseSold: 0,
            visibility: true,
          })
        } else {
          this.localSold.products.splice(index, 1)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async saveSold() {
      try {
        this.localSold.totalPrice = this.getTotalPrice

        if (this.localSold._id) {
          await this.$axios.put(
            `/admin/solds/${this.localSold._id}`,
            this.localSold
          )
        } else {
          await this.$axios.post('/admin/solds', this.localSold)
        }
        this.$router.push('/admin-panel/sold')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sold-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
  }

  .seller {
    display: flex;
    align-items: center;
    padding: 3px 0;

    input {
      margin-right: 10px;
    }
  }

  &__buyer {
    margin-top: 20px;
    display: flex;

    label {
      width: 250px;
      display: flex;
      flex-direction: column;
      margin-right: 10px;
    }
  }

  &__product-list {
    margin-top: 20px;

    label {
      width: 200px;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
  }

  &__product-table,
  &__table {
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
        background-color: transparent;
        border: none;
      }
    }
  }

  &__table-wrapper {
    margin-top: 20px;

    h3 {
      margin-bottom: 10px;
    }
  }

  &__actions {
    margin-top: 20px;
  }
}
</style>
