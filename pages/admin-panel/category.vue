<template>
  <div></div>
</template>

<script>
export default {
  components: {},
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const categoriesData = await $axios.get('/admin/categoryies')
      return {
        categories: categoriesData.data.categories,
      }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      headers: [
        {
          title: 'Название',
          key: 'name',
        },
        {
          title: 'Родительская категория',
          key: 'parent',
        },
      ],
      categories: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
