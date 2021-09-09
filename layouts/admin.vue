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
  async mounted() {
    try {
      const gendersResult = await this.$axios.get('/codebooks/genders')
      const categoriesResult = await this.$axios.get('/codebooks/categories')
      const sizesResult = await this.$axios.get('/codebooks/sizes')
      const sellerResult = await this.$axios.get('/codebooks/sellers')
      const rolesResult = await this.$axios.get('/admin/roles')
      this.$store.dispatch('codeBooks/setGenders', gendersResult.data.genders)
      this.$store.dispatch(
        'codeBooks/setCategories',
        categoriesResult.data.categories
      )
      this.$store.dispatch('codeBooks/setSellers', sellerResult.data.sellers)
      this.$store.dispatch('codeBooks/setSizes', sizesResult.data.sizes)
      this.$store.dispatch('codeBooks/setRoles', rolesResult.data.roles)
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
