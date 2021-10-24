<template>
  <div class="form">
    <div class="form__wrapper">
      <div class="form__field">
        <label>
          Артикул:
          <input
            v-model="product.articul"
            type="text"
            @change="getProductByArticul"
          />
        </label>
        <p style="text-align: right">Введите артикул и нажмите Enter</p>
        <label v-show="product._id">
          Пара для костюма:
          <input v-model="product.pair" type="text" />
        </label>
        <label>
          Тип:
          <select v-model="product.category">
            <template v-for="category in getGroupCategories">
              <option :key="category._id" disabled :value="category._id">
                {{ category.name }}
              </option>
              <option
                v-for="childCategory in category.child"
                :key="childCategory._id"
                :value="childCategory._id"
              >
                &ensp;&ensp;&ensp;{{ childCategory.name }}
              </option>
            </template>
          </select>
        </label>
        <label>
          Бренд:
          <input v-model="product.brand" type="text" />
        </label>
        <label>
          Название:
          <input v-model="product.name" type="text" />
        </label>
        <label>
          Пол:
          <div class="genders">
            <label v-for="gender in genders" :key="gender._id">
              {{ gender.name[0] }}
              <input
                v-model="product.gender"
                type="checkbox"
                name=""
                :value="gender._id"
              />
            </label>
          </div>
        </label>
        <label>
          Поставшик:
          <input v-model="product.provider" type="text" />
        </label>
        <label v-show="getRoleKey === 'admin'">
          Цена закупки:
          <input v-model="product.priceIn" type="text" />
        </label>
        <label>
          Цена витрины:
          <input v-model="product.priceOut" type="text" />
        </label>
        <label>
          Скидка:
          <input v-model="product.discount" type="text" />
        </label>
        <label class="size">
          Размер:
          <input v-model="product.size" type="text" />
          <select v-model="localSize" placeholder="Выбрать существующий">
            <option v-for="size in sizes" :key="size">{{ size }}</option>
          </select>
        </label>
        <label>
          Штрих код товара:
          <input v-model="product.codeProduct" type="text" />
        </label>
        <label>
          Штрих код коробки:
          <input v-model="product.codeBox" type="text" />
        </label>
        <label>
          Распаровка:
          <input v-model="product.notPair" type="checkbox" />
        </label>
        <label>
          Дата получения:
          <input v-model="product.dateIn" type="datetime-local" />
        </label>
        <label>
          Комментарий:
          <textarea v-model="product.comment" />
        </label>
        <div class="comment-templates">
          <button @click="product.comment = 'нет кроссовок'">
            нет кроссовок
          </button>
          <button @click="product.comment = 'нет коробки'">нет коробки</button>
          <button @click="product.comment = 'нет штрих-кода'">
            нет штрих-кода
          </button>
          <button @click="product.comment = 'не родная коробка'">
            не родная коробка
          </button>
          <button @click="product.comment = 'Дельта'">Дельта</button>
          <button @click="product.comment = 'Артема'">Артема</button>
          <button @click="product.comment = 'Kids'">Kids</button>
          <button @click="product.comment = ''">Очистить</button>
        </div>
        <label>
          Описание:
          <textarea />
        </label>
      </div>
      <div class="form__image">
        <v-file-controll :images="images" :articul="product.articul" />
      </div>
    </div>
    <button v-if="!product._id" :disabled="isDisabled" @click="saveProduct">
      Добавить
    </button>
    <button v-if="product._id" :disabled="isDisabled" @click="saveProduct">
      Сохранить
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import VFileControll from '@/components/VFileControll.vue'
import { getDateTimeForInput } from '@/assets/utils/date'

export default {
  components: {
    VFileControll,
  },
  layout: 'admin',
  props: {
    productProps: {
      type: Object,
      default: () => {},
    },
  },
  data: () => {
    return {
      images: [],
      localSize: '',
      isDisabled: false,
      product: {
        name: '',
        gender: [],
        category: '',
        size: '',
        brand: '',
        provider: '',
        codeBox: '',
        codeProduct: '',
        articul: '',
        pair: '',
        priceIn: 0,
        priceOut: 0,
        discount: 0,
        comment: '',
        dateIn: '',
        visibility: true,
        notPair: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      genders: 'codeBooks/genders',
      categories: 'codeBooks/categories',
      sizes: 'codeBooks/sizes',
    }),
    getRoleKey() {
      const { role } = this.$auth.$state.user
      return role?.key
    },
    getGroupCategories() {
      const categoriesList = []
      this.categories.forEach((category) => {
        if (!category.parent) {
          categoriesList.push({
            ...category,
            child: this.categories.filter((el) =>
              el.parent ? el.parent._id === category._id : false
            ),
          })
        }
      })
      return categoriesList
    },
  },
  watch: {
    localSize() {
      if (this.localSize) {
        this.product.size = this.localSize
        this.localSize = ''
      }
    },
  },
  created() {
    if (this.productProps) {
      this.images = this.productProps.images

      this.product = {
        ...this.product,
        ...this.productProps,
        dateIn: getDateTimeForInput(this.productProps.dateIn),
      }
    } else {
      this.product.dateIn = getDateTimeForInput(new Date())
    }
    if (this.$router.currentRoute.query.id) {
      this.dublicateProduct(this.$router.currentRoute.query.id)
    }
  },
  methods: {
    async dublicateProduct(id) {
      try {
        const {
          data: { product },
        } = await this.$axios.get(`/admin/products/${id}`)
        if (product) {
          this.images = product.images

          this.product = {
            ...this.product,
            ...product,
            visibility: true,
            articul: product.articul,
            discount: 0,
            priceIn: 0,
            dateIn: getDateTimeForInput(new Date()),
            createAt: getDateTimeForInput(new Date()),
            dateOut: null,
            priseSold: 0,
          }

          delete this.product._id
        }
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async getProductByArticul() {
      try {
        const productsData = await this.$axios.get(
          `/admin/products/articul/${this.product.articul}`
        )

        if (productsData.data.product) {
          this.images = productsData.data.product.images

          this.product = {
            ...this.product,
            ...productsData.data.product,
            visibility: true,
            articul: this.product.articul,
            discount: 0,
            priceIn: 0,
            dateIn: getDateTimeForInput(new Date()),
            createAt: getDateTimeForInput(new Date()),
            dateOut: null,
            priseSold: 0,
          }

          delete this.product._id
        } else {
          this.images = []
        }
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    firstChaptUpperCase(brand) {
      const localBrand = brand
      return localBrand[0].toUpperCase() + localBrand.slice(1)
    },
    fixSize(size) {
      const localSize = size
      return localSize.trim().replace(',', '.')
    },
    async saveProduct() {
      try {
        this.isDisabled = true
        const payload = JSON.parse(JSON.stringify(this.product))
        payload.brand = this.firstChaptUpperCase(
          payload.brand.toLowerCase().trim()
        )
        payload.size = this.fixSize(payload.size)
        if (this.product._id) {
          payload.dateIn = payload.dateIn ? new Date(payload.dateIn) : ''

          await this.$axios.put(`/admin/products/${this.product._id}`, payload)
          alert('Товар успешно обновлен')
        } else {
          await this.$axios.post(`/admin/products`, {
            ...payload,
          })
          alert('Товар успешно создан')
        }
        this.isDisabled = false
        this.$router.push('/admin-panel/products')
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  padding: 20px;

  &__wrapper {
    display: flex;
  }

  &__field {
    display: flex;
    flex-direction: column;
    width: 350px;

    label {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 5px;

      .genders {
        width: 55%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      &.size {
        input,
        select {
          width: 100px;
        }
      }

      input,
      select {
        margin-left: 10px;
        box-sizing: border-box;
      }
    }

    .comment-templates {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      button {
        width: 120px;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
