<template>
  <div ref="main" class="main">
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
  watch: {
    '$route.fullPath'() {
      if (this.$route.fullPath === '/') {
        this.$refs.main.classList.add('home')
      } else {
        this.$refs.main.classList.remove('home')
      }
    },
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
  mounted() {
    if (this.$route.fullPath === '/') {
      this.$refs.main.classList.add('home')
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &.home {
    background: url('~/assets/img/main-back.jpg') no-repeat center top;

    @media (max-width: 425px) {
      background-image: none;
      background-color: white;
    }
  }

  .container {
    flex-grow: 1;
  }
}
</style>
