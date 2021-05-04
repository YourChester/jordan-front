<template>
  <NuxtLink to="/" class="product__wrapper">
    <div class="product">
      <div class="product__image">
        <img
          v-if="isProductHaveImages"
          :src="product.images[0]"
          :alt="product.name"
        />
        <img
          v-else
          src="~/assets/img/tovar_no_photo.jpg"
          alt="Фото товара нет"
        />
        <div v-show="isProductHaveDiscount" class="image__discount">
          {{ product.discount }}%
        </div>
      </div>
      <div class="product__name">
        {{ product.name }}
      </div>
      <div class="product__articul">Артикул: {{ product.articul }}</div>
      <div
        class="product__price"
        :class="isProductHaveDiscount ? 'product__price-discount' : ''"
      >
        <span v-show="isProductHaveDiscount" class="discount_price">
          {{ getDiscountPrice }} РУБ
        </span>
        <span class="price"> {{ product.price }} РУБ </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isProductHaveImages() {
      return this.product?.images?.length
    },
    isProductHaveDiscount() {
      return this.product?.discount
    },
    getDiscountPrice() {
      return (
        this.product?.price -
        (this.product?.price * this.product?.discount) / 100
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  &__wrapper {
    width: 165px;
    margin-bottom: 20px;
    color: black;
    text-decoration: none;
  }

  &__image {
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: auto;
    }

    .image {
      &__discount {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
        color: white;
        background-color: red;
      }
    }
  }

  &__name {
    height: 35px;
    padding-bottom: 4px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }

  &__articul {
    padding-bottom: 4px;
    text-align: center;
    font-size: 12px;
  }

  &__price {
    padding-bottom: 4px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;

    &-discount {
      .discount_price {
        color: red;
      }

      .price {
        text-decoration: line-through;
      }
    }
  }
}
</style>
