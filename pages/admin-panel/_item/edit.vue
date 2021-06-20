<template>
  <div class="product-form__wrapper">
    <div class="product-form">
      <label>
        Название
        <input v-model="product.name" type="text" />
      </label>
      <label>
        Бренд
        <input v-model="product.brand" type="text" />
      </label>
      <label>
        Код товара
        <input v-model="product.codeProduct" type="text" />
      </label>
      <label>
        Код коробки
        <input v-model="product.codeBox" type="text" />
      </label>
      <label>
        Артикул
        <input
          v-model="product.articul"
          :disabled="!!product.images.length"
          type="text"
        />
      </label>
      <label>
        Пол
        <select v-model="product.gender">
          <option
            v-for="gender in genders"
            :key="gender._id"
            :value="gender._id"
          >
            {{ gender.name }}
          </option>
        </select>
      </label>
      <label>
        Категория товара
        <select v-model="product.category">
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
      </label>
      <label>
        Поставщик
        <input v-model="product.provider" type="text" />
      </label>
      <label>
        Пара
        <input v-model="product.pair" type="text" />
      </label>
      <label>
        Цена поставки
        <input v-model="product.priceIn" type="text" />
      </label>
      <label>
        Цена продажи
        <input v-model="product.priceOut" type="text" />
      </label>
      <label>
        Продали за
        <input v-model="product.priseSold" type="text" />
      </label>
      <label>
        Исрпользовать скидку
        <select v-model="product.canUseDiscount">
          <option :value="true">Да</option>
          <option :value="false">Нет</option>
        </select>
      </label>
      <label>
        Скидка
        <input v-model="product.discount" type="text" />
      </label>
      <label>
        Продавец
        <input v-model="product.seller" type="text" disabled />
      </label>
      <label>
        Комментарий
        <textarea v-model="product.comment" type="text" />
      </label>
      <label>
        Видимость на сайте
        <select v-model="product.visibility">
          <option :value="true">Да</option>
          <option :value="false">Нет</option>
        </select>
      </label>
      <label>
        Дата поставки
        <input v-model="product.dateIn" type="date" />
      </label>
      <label>
        Дата продажи
        <input v-model="product.dateOut" type="date" disabled />
      </label>
      <label>
        Дата создания
        <input v-model="product.createAt" type="date" />
      </label>
      <div>
        <v-file-controll :images="product.images" :articul="product.articul" />
      </div>
    </div>
    <div class="product-form__actions">
      <button class="delete-btn" @click="deleteProduct">Удалить</button>
      <button @click="saveProduct">Сохранить</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDateForInput } from '@/assets/utils/date'
import VFileControll from '@/components/VFileControll.vue'

export default {
  components: {
    VFileControll,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const productData = await $axios.get(`/admin/products/${params.item}`)
    const product = productData.data.product
    product.dateIn = getDateForInput(product.dateIn)
    product.dateOut = getDateForInput(product.dateOut)
    product.createAt = getDateForInput(product.createAt)
    return {
      product,
    }
  },
  data: () => {
    return {
      newFile: [],
      deleteFile: [],
    }
  },
  computed: {
    ...mapGetters({
      categories: 'codeBooks/categories',
      genders: 'codeBooks/genders',
    }),
  },
  methods: {
    async deleteProduct() {
      try {
        await this.$axios.delete(`/admin/products/${this.product._id}`)
        this.$router.push('/admin-panel')
      } catch (e) {
        console.log(e)
      }
    },
    async saveProduct() {
      try {
        const payload = JSON.parse(JSON.stringify(this.product))

        payload.dateIn = payload.dateIn ? new Date(payload.dateIn) : ''
        payload.dateOut = payload.dateOut ? new Date(payload.dateOut) : ''
        payload.createAt = payload.createAt ? new Date(payload.createAt) : ''

        await this.$axios.put(`/admin/products/${this.product._id}`, payload)
        this.$router.push('/admin-panel')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.product-form {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;

  &__wrapper {
    width: 50%;
    margin: 0 auto;
    padding: 20px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    button {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      border: none;
      border-radius: 10px;
      background-color: #ff0000;
      outline: none;

      &.delete-btn {
        background-color: #969696;
      }
    }
  }

  label {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    input,
    select,
    textarea {
      width: 100%;
      display: block;
      box-sizing: border-box;
      border-radius: 5px;
      border: 2px solid #000;
      padding: 5px;
      font-size: 16px;
      font-weight: 600;
      outline: none;

      &:focus,
      &:active {
        border-color: #ff0000;
      }
    }

    input[type='file'] {
      border: none;
    }
  }
}
</style>
