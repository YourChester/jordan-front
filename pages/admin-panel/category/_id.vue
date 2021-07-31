<template>
  <div class="category">
    <h1>Категория</h1>
    <v-category-form :category-props="category" @save="saveCategory" />
  </div>
</template>

<script>
import VCategoryForm from '@/components/VCategoryForm'

export default {
  components: {
    VCategoryForm,
  },
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const {
        data: { category },
      } = await $axios.get(`/admin/categoryies/${params.id}`)
      console.log(category)

      return {
        category,
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async saveCategory(category) {
      try {
        const payload = JSON.parse(JSON.stringify(category))

        await this.$axios.put(`/admin/categoryies/${payload._id}`, payload)
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
