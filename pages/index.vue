<template>
  <div class="products">
    <v-slider :slides="slides" />
    <div class="products__list">
      <v-product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import VSlider from '@/components/VSlider'
import VProductCard from '@/components/VProductCard'

export default {
  components: {
    VProductCard,
    VSlider,
  },
  data() {
    return {
      products: [
        {
          _id: 1,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 2,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 3,
          name: 'Nike Jordan Nike Jordan Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 4,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 5,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 6,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 7,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 8,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
          discount: 10,
        },
        {
          _id: 9,
          name: 'Nike Jordan Nike Jordan Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
        {
          _id: 10,
          name: 'Nike Jordan',
          articul: 'BV9299-010',
          price: '12490',
        },
      ],
      slides: [
        {
          img: '/img/slide_nikeman.jpg',
          name: 'Nike Men',
        },
        {
          img: '/img/slide_nikewomen.jpg',
          name: 'Nike Women',
        },
        {
          img: '/img/slide_jordan.jpg',
          name: 'Jordan',
        },
        {
          img: '/img/slide_shop.jpg',
          name: 'Shop',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.products {
  &__list {
    width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
