<template>
  <div>
    <v-table :headers="headers" :items="genders" />
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
    const gendersData = await $axios.get('/admin/genders')
    return {
      genders: gendersData.data.genders,
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
