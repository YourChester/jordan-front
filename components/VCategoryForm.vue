<template>
  <div class="form__wrapper">
    <div class="form">
      <label>
        Название:
        <input v-model="category.name" type="text" />
      </label>
      <label>
        Родительская Категория:
        <select v-model="category.parent">
          <option :value="null">Выберите родительскую категорию</option>
          <option
            v-for="parentCategory in categories.filter((el) => !el.parent)"
            :key="parentCategory._id"
            :value="parentCategory._id"
          >
            {{ parentCategory.name }}
          </option>
        </select>
      </label>
    </div>
    <button
      @click="category._id ? $emit('save', category) : $emit('add', category)"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    categoryProps: {
      type: Object,
      default: () => {},
    },
    parent: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      category: {
        name: '',
        parent: null,
      },
    }
  },
  computed: {
    ...mapGetters({
      categories: 'codeBooks/categories',
    }),
  },
  created() {
    if (this.categoryProps) {
      this.category = {
        ...this.category,
        ...this.categoryProps,
      }
    }
    if (this.parent) {
      this.category.parent = this.parent
    }
  },
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  label {
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }

  &__wrapper {
    padding: 20px;

    button {
      margin-top: 20px;
    }
  }
}
</style>
