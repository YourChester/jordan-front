<template>
  <div class="products">
    <v-slider :slides="slides" class="products__slider" />
    <div class="products__list">
      <v-product-card
        v-for="product in products"
        :key="product._id"
        :product="product.products[0]"
        :products="product.products"
        :images="product.images"
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
      products: [],
      slides: [
        {
          img: '/img/slide_nikeman.jpg',
          name: 'Nike Men',
          key: 'Мужчины',
        },
        {
          img: '/img/slide_nikewomen.jpg',
          name: 'Nike Women',
          key: 'Женщины',
        },
        {
          img: '/img/slide_jordan.jpg',
          name: 'Jordan',
          link: '/all?brand=Jordan',
        },
        {
          img: '/img/slide_shop.jpg',
          name: 'Shop',
          link: '/',
        },
      ],
    }
  },
  async fetch() {
    try {
      const productsData = await this.$axios.get('/products', {
        params: { page: 1, limit: 10 },
      })
      this.products = productsData.data.products
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  fetchOnServer: false,
}
</script>

<style lang="scss" scoped>
.products {
  &__slider {
    @media (max-width: 425px) {
      box-shadow: 0px 5px 10px 2px rgba(243, 243, 243, 1);
    }
  }

  &__list {
    width: 960px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 960px) {
      width: 100%;
      padding: 20px 0;
      display: flex;
      justify-content: center;

      .product__wrapper {
        margin: 10px;
      }
    }
  }
}
</style>
