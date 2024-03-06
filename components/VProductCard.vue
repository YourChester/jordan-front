<template>
  <NuxtLink :to="`/product/${product._id}`" class="product-card__wrapper">
    <div
      class="product-card"
      @mouseover="visibleCard = true"
      @mouseleave="visibleCard = false"
    >
      <div class="product-card__image">
        <img
          v-if="isProductHaveImages"
          :src="`${url}${images[0]}`"
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
        <div v-show="isNewProduct && !isCommingSoon" class="image__new">
          Новинка
        </div>
        <div v-show="isCommingSoon" class="image__soon">Скоро в продаже</div>
      </div>
      <div class="product-card__name">
        {{ product.name }}
      </div>
      <div class="product-card__articul">Артикул: {{ product.articul }}</div>
      <div
        class="product-card__price"
        :class="isProductHaveDiscount ? 'product-card__price-discount' : ''"
      >
        <span v-show="isProductHaveDiscount" class="discount_price">
          {{ getDiscountPrice }} РУБ
        </span>
        <span class="price"> {{ product.priceOut }} РУБ </span>
      </div>
      <div v-show="visibleCard && getSizes.length" class="product-card__hovers">
        <div class="product-card__image">
          <img
            v-if="isProductHaveImages"
            :src="`${url}${images[0]}`"
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
          <div v-show="isNewProduct && !isCommingSoon" class="image__new">
            Новинка
          </div>
          <div v-show="isCommingSoon" class="image__soon">Скоро в продаже</div>
        </div>
        <div class="product-card__name">
          {{ product.name }}
        </div>
        <div class="product-card__sizes">
          <div
            v-for="(size, index) in getSizes"
            :key="size + index"
            class="product-card__size"
          >
            {{ size }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    products: {
      type: Array,
      default: () => [],
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {
      visibleCard: false,
      url: `${process.env.API_URL}/static/`,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'codeBooks/categories',
    }),
    getSizes() {
      const category = this.categories.find(
        (el) => el._id === this.product.category
      )
      const sizes = []
      this.products.forEach((el) => {
        if (el.size && !sizes.includes(el.size)) {
          sizes.push(el.size)
        }
      })
      if (
        category &&
        (category.name === 'Обувь' || category.parent.name === 'Обувь')
      ) {
        // eslint-disable-next-line prefer-regex-literals
        const re = new RegExp(/[А-Яа-яA-Za-z]/)
        sizes.sort((first, next) => {
          if (re.test(first) && re.test(next)) {
            if (Number(first.slice(0, -1)) === Number(next.slice(0, -1))) {
              return 0
            } else if (Number(first.slice(0, -1)) > Number(next.slice(0, -1))) {
              return 1
            } else {
              return -1
            }
          } else if (!re.test(first) && re.test(next)) {
            if (Number(first) === Number(next.slice(0, -1))) {
              return 1
            } else if (Number(first) > Number(next.slice(0, -1))) {
              return 1
            } else {
              return -1
            }
          } else if (re.test(first) && !re.test(next)) {
            if (Number(first.slice(0, -1)) === Number(next)) {
              return -1
            } else if (Number(first.slice(0, -1)) > Number(next)) {
              return 1
            } else {
              return -1
            }
          } else if (!re.test(first) && !re.test(next)) {
            return Number(first) > Number(next) ? 1 : -1
          } else {
            return 0
          }
        })
      } else {
        sizes.sort()
      }
      return sizes
    },
    isProductHaveImages() {
      return this.images.length
    },
    isProductHaveDiscount() {
      return this.product?.discount
    },
    isNewProduct() {
      const date = new Date()
      const productDate = new Date(this.product.dateIn)
      return (
        Math.ceil(
          Math.abs(date.getTime() - productDate.getTime()) / (1000 * 3600 * 24)
        ) < 7
      )
    },
    isCommingSoon() {
      return this.product.onSaleSoon
    },
    getDiscountPrice() {
      return (
        this.product?.priceOut -
        (this.product?.priceOut * this.product?.discount) / 100
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;

  &__hovers {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
  }

  &__wrapper {
    width: 165px;
    margin-bottom: 20px;
    color: black;
    text-decoration: none;
  }

  &__image {
    width: 165px;
    height: 168px;
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

      &__new,
      &__soon {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        color: white;
        background-color: #5fc9cb;
      }

      &__soon {
        background-color: red;
      }
    }
  }

  &__name {
    height: 35px;
    padding: 0 4px;
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

  &__sizes {
    padding: 5px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  &__size {
    width: 40px;
    padding: 3px 0;
    margin: 5px;
    text-align: center;
    border: 1px solid black;
  }
}
</style>
