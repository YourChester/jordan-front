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
}
</script>

<style lang="scss" scoped>
.main {
  &.home-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: url('~/assets/img/main-back.jpg') no-repeat center top;
  }

  .container {
    flex-grow: 1;
  }
}
</style>
