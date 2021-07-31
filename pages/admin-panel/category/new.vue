<template>
  <div class="category">
    <h1>Категория</h1>
    <v-category-form :parent="parent" @add="addCategory" />
  </div>
</template>

<script>
import VCategoryForm from '@/components/VCategoryForm'

export default {
  components: {
    VCategoryForm,
  },
  layout: 'admin',
  asyncData({ query }) {
    try {
      let parent = ''
      if (query.parent) {
        parent = query.parent
      }
      return {
        parent,
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async addCategory(category) {
      try {
        const payload = JSON.parse(JSON.stringify(category))

        await this.$axios.post('/admin/categoryies/', payload)
        this.$router.push('/admin-panel/category')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  padding: 20px;
}
</style>
