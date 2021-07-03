<template>
  <div class="form">
    <div class="form__wrapper">
      <div class="form__field">
        <label>
          Артикул:
          <input v-model="product.articul" type="text" @input="debounceSerch" />
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
        <label>
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
        <label>
          Описание:
          <textarea />
        </label>
      </div>
      <div class="form__image">
        <v-file-controll :images="images" :articul="product.articul" />
      </div>
    </div>
    <button v-if="!product._id" @click="addProduct">Добавить</button>
    <button v-if="product._id" @click="saveProduct">Сохранить</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'

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
      debounceSerch: null,
      images: [],
      localSize: '',
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
    this.debounceSerch = debounce(this.getProductByArticul, 1000)
    if (this.productProps) {
      this.images = this.productProps.images

      this.product = {
        ...this.product,
        ...this.productProps,
        dateIn: getDateTimeForInput(this.productProps.dateIn),
      }
    }
    if (this.$router.currentRoute.query.articul) {
      this.product.articul = this.$router.currentRoute.query.articul
      this.getProductByArticul()
    }
  },
  methods: {
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
            size: '',
            dateIn: getDateTimeForInput(new Date()),
            createAt: getDateTimeForInput(new Date()),
          }

          delete this.product._id
        }
      } catch (e) {
        console.log(e)
      }
    },
    addProduct() {
      this.$emit('add', this.product)
    },
    saveProduct() {
      this.$emit('save', this.product)
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
  }
}
</style>
