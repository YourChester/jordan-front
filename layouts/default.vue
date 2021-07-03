<template>
  <div class="main" :class="$route.path === '/' ? 'home-page' : ''">
    <v-header />
    <div class="container">
      <Nuxt />
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from '@/components/VHeader'
import VFooter from '@/components/VFooter'

export default {
  components: {
    VHeader,
    VFooter,
  },
  async created() {
    try {
      const menuResult = await this.$axios.get('/codebooks/menu-tree')
      const gendersResult = await this.$axios.get('/codebooks/genders')
      const categoriesResult = await this.$axios.get('/codebooks/categories')
      this.$store.dispatch('codeBooks/setMenuTree', menuResult.data.menu)
      this.$store.dispatch('codeBooks/setGenders', gendersResult.data.genders)
      this.$store.dispatch(
        'codeBooks/setCategories',
        categoriesResult.data.categories
      )
    } catch (e) {
      console.log(e)
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &.home-page {
    background: url('~/assets/img/main-back.jpg') no-repeat center top;
  }

  .container {
    flex-grow: 1;
  }
}
</style>
