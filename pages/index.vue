<template>
  <div class="products">
    <v-slider :slides="slides" />
    <div class="products__list">
      <v-product-card
        v-for="product in products"
        :key="product._id"
        :product="product.products[0]"
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
  async asyncData({ $axios }) {
    const productsData = await $axios.get('/products', {
      params: { limit: 10 },
    })
    return {
      products: productsData.data.products,
    }
  },
  data() {
    return {
      slides: [
        {
          img: '/img/slide_nikeman.jpg',
          name: 'Nike Men',
          link: '/1',
        },
        {
          img: '/img/slide_nikewomen.jpg',
          name: 'Nike Women',
          link: '/2',
        },
        {
          img: '/img/slide_jordan.jpg',
          name: 'Jordan',
          link: '/3',
        },
        {
          img: '/img/slide_shop.jpg',
          name: 'Shop',
          link: '/4',
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
