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
        <table
          v-show="getFiltredProducts.length"
          class="sold-form__product-table"
        >
          <tr>
            <th rowspan="2" width="100px">Тип</th>
            <th rowspan="2" width="250px">Название</th>
            <th rowspan="2" width="250px">Артикул</th>
            <th rowspan="2" width="80px">Цена</th>
            <th rowspan="2" width="60px">Размер</th>
            <th colspan="2">Штрих код</th>
            <th rowspan="2">Добавить</th>
          </tr>
          <tr>
            <th width="130px">Товара</th>
            <th width="130px">Коробка</th>
          </tr>
          <tr v-for="item in getFiltredProducts" :key="item._id">
            <td>
              {{ item.category ? item.category.name : '' }}
            </td>
            <td>
              {{ item.name }}
            </td>
            <td>
              <div class="articul">
                <img
                  v-show="item.pairImages && item.pairImages.length"
                  src="~/assets/img/imgpare.jpeg"
                  width="15px"
                  alt="Картинка"
                  class="pair"
                  @mouseover="visibilityImageModal(item.pairImages[0], true)"
                  @mouseleave="visibilityImageModal('', false)"
                />
                <div>{{ item.articul }}</div>
                <img
                  v-show="item.images && item.images.length"
                  src="~/assets/img/imgart.jpeg"
                  width="20px"
                  alt="Картинка"
                  class="image"
                  @mouseover="visibilityImageModal(item.images[0], true)"
                  @mouseleave="visibilityImageModal('', false)"
                />
              </div>
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
        <div class="sold-form__title">
          <h3>Продаваемый товар на сумму</h3>
          <input v-model="localSold.totalPrice" type="number" />
        </div>
        <table class="sold-form__table">
          <tr>
            <th width="250px">Название</th>
            <th width="100px">Размер</th>
            <th width="250px">Артикул</th>
            <th width="120px">Цена витрины со скидкой</th>
            <th width="120px">Дисконт товара</th>
            <th>{{ localSold._id ? 'Возврат' : 'Удалить' }}</th>
          </tr>
          <tr v-for="(item, index) in localSold.products" :key="item._id">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.size }}
            </td>
            <td>
              <div class="articul">
                <img
                  v-show="item.pairImages && item.pairImages.length"
                  src="~/assets/img/imgpare.jpeg"
                  width="15px"
                  alt="Картинка"
                  class="pair"
                  @mouseover="visibilityImageModal(item.pairImages[0], true)"
                  @mouseleave="visibilityImageModal('', false)"
                />
                <div>{{ item.articul }}</div>
                <img
                  v-show="item.images && item.images.length"
                  src="~/assets/img/imgart.jpeg"
                  width="20px"
                  alt="Картинка"
                  class="image"
                  @mouseover="visibilityImageModal(item.images[0], true)"
                  @mouseleave="visibilityImageModal('', false)"
                />
              </div>
            </td>
            <td>
              {{ item.priseSold }}
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
      <div class="sold-form__comment">
        <label>
          Комментарии
          <textarea
            v-model="localSold.comment"
            type="text"
            @input="debounceSerchCard"
          />
        </label>
      </div>
    </div>
    <div class="sold-form__actions">
      <button :disabled="loadData" @click="saveSold">Сохранить</button>
    </div>
    <div v-if="modalVisibility" class="sold-form__image-alert">
      <img width="100%" height="auto" :src="`${url}${imageUrl}`" />
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
        comment: '',
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
      url: process.env.IMG_URL,
      modalVisibility: false,
      imageUrl: '',
      loadData: false,
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
            ? Number(el.priseSold) -
              (Number(el.priseSold) / 100) * this.localSold.discount
            : Number(el.priseSold)
        return price + priseSold
      }, 0)

      return Math.round(totalPrice)
    },
    getTotalIncome() {
      const totalPriceIn = this.localSold.products.reduce((price, el) => {
        const priceIn = el.priceIn ? el.priceIn : 0
        return price + priceIn
      }, 0)

      return Math.round(this.localSold.totalPrice - totalPriceIn)
    },
    getTotalOut() {
      const totalPrice = this.localSold.products.reduce((price, el) => {
        return (price += el.priceIn)
      }, 0)

      return Math.round(totalPrice)
    },
    getFiltredProducts() {
      // eslint-disable-next-line array-callback-return
      return this.products.filter((el) => {
        const index = this.localSold.products.findIndex(
          (prod) => prod._id === el._id
        )
        if (index === -1) {
          return el
        }
      })
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
    if (this.$router.currentRoute.query.id) {
      this.getProductById(this.$router.currentRoute.query.id)
    }
  },
  methods: {
    visibilityImageModal(imgUrl, state) {
      this.imageUrl = imgUrl
      this.modalVisibility = state
    },
    updateTotalPrice() {
      this.localSold.totalPrice = this.getTotalPrice
    },
    async getDiscountCard() {
      try {
        if (!this.buyer.cardCode) {
          this.buyer.name = ''
          this.localSold.card = null
          this.localSold.discount = 0
          this.localSold.totalPrice = this.getTotalPrice
          return
        }

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
        this.localSold.totalPrice = this.getTotalPrice
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async getProduct() {
      try {
        const {
          data: { products },
        } = await this.$axios.get('/admin/products', {
          params: {
            visibility: true,
            search: this.product,
            limit: 100,
            page: 1,
          },
        })
        this.products = products
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async getProductById(id) {
      try {
        const {
          data: { product },
        } = await this.$axios.get(`/admin/products/${id}`)
        if (product) {
          this.addProduct(product)
        }
      } catch (e) {
        console.log(e?.message || '')
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
      this.localSold.totalPrice = this.getTotalPrice
    },
    async deleteProduct(index) {
      try {
        if (!confirm('Вы уверены что хотите удалить товар из продажи?')) {
          return
        }
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
        this.localSold.totalPrice = this.getTotalPrice
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async saveSold() {
      try {
        if (!this.localSold.seller.length) {
          alert('Добавте продавцов')
          return
        }
        this.loadData = true
        this.localSold.totalIncome = this.getTotalIncome
        this.localSold.totalOut = this.getTotalOut

        if (this.localSold._id) {
          await this.$axios.put(
            `/admin/solds/${this.localSold._id}`,
            this.localSold
          )
          alert('Продажа успешно обновлена')
        } else {
          await this.$axios.post('/admin/solds', this.localSold)
          alert('Продажа успешно создана')
        }
        this.loadData = false
        this.$router.push('/admin-panel/sold')
      } catch (e) {
        console.log(e?.message || '')
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

  &__title {
    h3 {
      display: inline-block;
      margin-right: 10px;
    }
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
    }
  }

  &__table-wrapper {
    margin-top: 20px;

    h3 {
      margin-bottom: 10px;
    }
  }

  &__comment {
    margin-top: 20px;

    label {
      display: flex;
      flex-direction: column;
      width: 400px;
    }
  }

  &__actions {
    margin-top: 20px;
  }

  &__image-alert {
    position: fixed;
    top: 50px;
    left: 50px;
    width: 520px;
    height: 520px;
    padding: 10px;
    border: 1px solid black;
    background-color: white;

    img {
      width: 520px;
      height: 520px;
    }
  }
}
</style>
