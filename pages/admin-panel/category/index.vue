<template>
  <div class="category">
    <h1>Категории</h1>
    <div class="category__table-wrapper">
      <table class="category__table">
        <tr>
          <td v-for="category in getTreeCategories" :key="category._id">
            <div class="category__item">
              <div>
                {{ category.name }}
              </div>
              <nuxt-link :to="`/admin-panel/category/${category._id}`">
                e
              </nuxt-link>
            </div>
          </td>
          <td rowspan="2">
            <nuxt-link :to="`/admin-panel/category/new`"> + </nuxt-link>
          </td>
        </tr>
        <tr>
          <td
            v-for="(parentCategory, index) in getTreeCategories"
            :key="parentCategory._id + index"
          >
            <div
              v-for="childrenCategory in parentCategory.children"
              :key="childrenCategory._id"
              class="category__item"
            >
              <div>
                {{ childrenCategory.name }}
              </div>
              <div>
                <nuxt-link
                  :to="`/admin-panel/category/${childrenCategory._id}`"
                >
                  e
                </nuxt-link>
              </div>
              <button
                class="link"
                @click="deleteCategory(childrenCategory._id)"
              >
                X
              </button>
            </div>
            <div>
              <nuxt-link
                :to="`/admin-panel/category/new?parent=${parentCategory._id}`"
              >
                +
              </nuxt-link>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const {
        data: { categories },
      } = await $axios.get('/admin/categoryies')

      return {
        currentPage: 1,
        perPage: 100,
        categories,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  computed: {
    getTreeCategories() {
      const parentCategories = this.categories?.filter((el) => !el.parent)
      return parentCategories.map((el) => {
        return {
          ...el,
          children: this.categories
            ?.filter((item) => item.parent)
            .filter((child) => child.parent._id === el._id),
        }
      })
    },
  },
  methods: {
    async getList() {
      try {
        const {
          data: { categories },
        } = await this.$axios.get('/admin/categoryies')
        this.categories = categories
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async deleteCategory(id) {
      try {
        await this.$axios.delete(`/admin/categoryies/${id}`)
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  padding: 20px;
  position: relative;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    div {
      margin: 0 10px;
    }
  }

  &__table {
    border-spacing: 0;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;
      vertical-align: top;

      .link {
        text-decoration: underline;
        cursor: pointer;
        border: none;
        background-color: transparent;
      }

      a {
        text-decoration: underline;
        cursor: pointer;
        border: none;
        background-color: transparent;
        color: black;
      }
    }

    &--categories-list {
      display: flex;
      flex-direction: column;
    }

    &-wrapper {
      margin-top: 15px;
      margin-right: 20px;
    }
  }
}
</style>
