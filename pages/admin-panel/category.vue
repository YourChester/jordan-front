<template>
  <div>
    <v-table :headers="headers" :items="categories">
      <template #parent="{ row }">{{
        row.parent ? row.parent.name : ''
      }}</template>
    </v-table>
  </div>
</template>

<script>
import VTable from '@/components/VTable.vue'

export default {
  components: {
    VTable,
  },
  layout: 'admin',
  async asyncData({ $axios }) {
    const categoriesData = await $axios.get('/admin/categoryies')
    return {
      categories: categoriesData.data.categories,
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
