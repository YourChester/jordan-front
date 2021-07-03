<template>
  <div></div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const gendersData = await $axios.get('/admin/genders')
      return {
        genders: gendersData.data.genders,
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
      ],
      genders: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
