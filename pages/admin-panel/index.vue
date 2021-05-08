<template>
  <div>
    <v-table :headers="headers" :items="products" />
  </div>
</template>

<script>
import VTable from '@/components/VTable.vue'

export default {
  components: {
    VTable,
  },
  layout: 'admin',
  data() {
    return {
      headers: [
        {
          title: 'Название',
          key: 'name',
        },
        {
          title: 'Пол',
          key: 'gender',
        },
        {
          title: 'Размер',
          key: 'size',
        },
        {
          title: 'Бренд',
          key: 'brand',
        },
        {
          title: 'Поставщик',
          key: 'provider',
        },
        {
          title: 'Код коробки',
          key: 'codeBox',
        },
        {
          title: 'Код продукта',
          key: 'codeProduct',
        },
        {
          title: 'Артикул',
          key: 'articul',
        },
        {
          title: 'Артикул пары',
          key: 'pair',
        },
        {
          title: 'Цена закупки',
          key: 'priceIn',
        },
        {
          title: 'Цена',
          key: 'priceOut',
        },
        {
          title: 'Цена продажи',
          key: 'priseSold',
        },
        {
          title: 'Скидка',
          key: 'discount',
        },
        {
          title: 'Исрпользовать скидку',
          key: 'canUseDiscount',
        },
        {
          title: 'Продавец',
          key: 'seller',
        },
        {
          title: 'Комментарий',
          key: 'comment',
        },
        {
          title: 'Дата поступления',
          key: 'dateIn',
        },
        {
          title: 'Дата продажи',
          key: 'dateOut',
        },
        {
          title: 'Дата Создания',
          key: 'createAt',
        },
        {
          title: 'Видимость',
          key: 'visibility',
        },
        {
          title: 'Действия',
          key: 'actions',
        },
      ],
      products: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
