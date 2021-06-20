<template>
  <div>
    <v-admin-header />
    <Nuxt />
  </div>
</template>

<script>
import VAdminHeader from '@/components/VAdminHeader'

export default {
  components: {
    VAdminHeader,
  },
  middleware: 'authAdmin',
  async created() {
    const gendersResult = await this.$axios.get('/codebooks/genders')
    const categoriesResult = await this.$axios.get('/codebooks/categories')
    const sizesResult = await this.$axios.get('/codebooks/sizes')
    this.$store.dispatch('codeBooks/setGenders', gendersResult.data.genders)
    this.$store.dispatch(
      'codeBooks/setCategories',
      categoriesResult.data.categories
    )
    this.$store.dispatch('codeBooks/setSizes', sizesResult.data.sizes)
  },
}
</script>
