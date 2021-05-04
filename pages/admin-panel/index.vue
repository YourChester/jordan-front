<template>
  <div>
    <button @click="logOut">Выйти</button>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  methods: {
    async logOut() {
      await this.$auth.logout()
      this.$router.push('/admin-panel/login')
    },
  },
}
</script>

<style lang="scss" scoped></style>
