<template>
  <div class="product__wrapper">
    <div class="product__body">
      <div class="product__images">
        <div class="product__image">
          <img
            v-show="!product.images.length"
            src="~/assets/img/tovar_no_photo.jpg"
            alt=""
            width="100%"
          />
          <img
            v-show="product.images.length"
            :src="`${url}${product.images[currentImage]}`"
            alt=""
          />
        </div>
        <div v-show="product.images.length" class="product__images-list">
          <div
            v-for="(image, index) in product.images"
            :key="image"
            :class="index === currentImage ? 'active' : ''"
            @click="currentImage = index"
          >
            <img :src="`${url}${image}`" />
          </div>
        </div>
      </div>
      <div class="product__info">
        <div class="product__title">
          <h1>
            {{ product.name }}
          </h1>
        </div>
        <div class="product__articul">Код товара: {{ product.articul }}</div>
        <div class="product__price">
          <h2>{{ getCurrentPrice }} руб.</h2>
          <span v-show="isProductHaveDiscount">
            {{ product.priceOut }} руб.
          </span>
        </div>
        <div class="product__size">
          Размер в наличии: {{ sizes.join(', ') }}
        </div>
      </div>
    </div>
    <div v-if="product.pairProduct" class="product__pair">
      <h3>Возьми в пару к костюму</h3>
      <div class="product__pair-list">
        <v-product-card
          :product="product.pairProduct.pairs[0]"
          :products="product.pairProduct.pairs"
          :images="product.pairProduct.images"
        />
      </div>
    </div>
    <div v-show="isProductShose" class="product__size-table">
      <div class="sizes">
        <div class="size__title" @click="showTableSize = !showTableSize">
          <span> Таблица размеров </span>
          <img
            :class="showTableSize ? 'active' : ''"
            src="~/assets/img/angle-down-solid.svg"
            width="14"
          />
        </div>
        <p v-show="showTableSize" class="size__subtitle">
          Измерения представлены согласно таблицам производителя
        </p>
        <div v-show="showTableSize" class="sizes-table">
          <table>
            <tbody>
              <tr class="th">
                <th colspan="18">Мужчины</th>
              </tr>
              <tr>
                <th>US</th>
                <td>6</td>
                <td>6,5</td>
                <td>7</td>
                <td>7,5</td>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
                <td>10</td>
                <td>10,5</td>
                <td>11</td>
                <td>11,5</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>UK</th>
                <td>5,5</td>
                <td>6</td>
                <td>6</td>
                <td>6,5</td>
                <td>7</td>
                <td>7,5</td>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
                <td>10</td>
                <td>10,5</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>Europe</th>
                <td>38,5</td>
                <td>39</td>
                <td>40</td>
                <td>40,5</td>
                <td>41</td>
                <td>42</td>
                <td>42,5</td>
                <td>43</td>
                <td>44</td>
                <td>44,5</td>
                <td>45</td>
                <td>45,5</td>
                <td>46</td>
                <td>47,5</td>
                <td>48,5</td>
                <td>49,5</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>CM</th>
                <td>24</td>
                <td>24,5</td>
                <td>25</td>
                <td>25,5</td>
                <td>26</td>
                <td>26,5</td>
                <td>27</td>
                <td>27,5</td>
                <td>28</td>
                <td>28,5</td>
                <td>29</td>
                <td>29,5</td>
                <td>30</td>
                <td>31</td>
                <td>32</td>
                <td>33</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr class="th">
                <th colspan="18">Женщины</th>
              </tr>
              <tr>
                <th>US</th>
                <td>5</td>
                <td>5,5</td>
                <td>6</td>
                <td>6,5</td>
                <td>7</td>
                <td>7,5</td>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
                <td>10</td>
                <td>10,5</td>
                <td>11</td>
                <td>11,5</td>
                <td>12</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>UK</th>
                <td>2,5</td>
                <td>3</td>
                <td>3,5</td>
                <td>4</td>
                <td>4,5</td>
                <td>5</td>
                <td>5,5</td>
                <td>6</td>
                <td>6,5</td>
                <td>7</td>
                <td>7,5</td>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>Europe</th>
                <td>35,5</td>
                <td>36</td>
                <td>36,5</td>
                <td>37,5</td>
                <td>38</td>
                <td>38,5</td>
                <td>39</td>
                <td>40</td>
                <td>40,5</td>
                <td>41</td>
                <td>42</td>
                <td>42,5</td>
                <td>43</td>
                <td>44</td>
                <td>44,5</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>CM</th>
                <td>22</td>
                <td>22,5</td>
                <td>23</td>
                <td>23,5</td>
                <td>24</td>
                <td>24,5</td>
                <td>25</td>
                <td>25,5</td>
                <td>26</td>
                <td>26,5</td>
                <td>27</td>
                <td>27,5</td>
                <td>28</td>
                <td>28,5</td>
                <td>29</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr class="th">
                <th colspan="18">Младшие классы</th>
              </tr>
              <tr>
                <th>US</th>
                <td>3,5Y</td>
                <td>4Y</td>
                <td>4,5Y</td>
                <td>5Y</td>
                <td>5,5Y</td>
                <td>6Y</td>
                <td>6,5Y</td>
                <td>7Y</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>UK</th>
                <td>3</td>
                <td>3,5</td>
                <td>4</td>
                <td>4,5</td>
                <td>5</td>
                <td>5,5</td>
                <td>6</td>
                <td>6</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>Europe</th>
                <td>35,5</td>
                <td>36</td>
                <td>36,5</td>
                <td>37,5</td>
                <td>38</td>
                <td>38,5</td>
                <td>39</td>
                <td>40</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>CM</th>
                <td>22,5</td>
                <td>23</td>
                <td>23,5</td>
                <td>23,5</td>
                <td>24</td>
                <td>24</td>
                <td>24,5</td>
                <td>25</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr class="th">
                <th colspan="18">Дошколята</th>
              </tr>
              <tr>
                <th>US</th>
                <td>10,5</td>
                <td>11</td>
                <td>11,5</td>
                <td>12</td>
                <td>12,5</td>
                <td>13</td>
                <td>13,5</td>
                <td>1Y</td>
                <td>1,5Y</td>
                <td>2Y</td>
                <td>2,5Y</td>
                <td>3Y</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>UK</th>
                <td>10</td>
                <td>10,5</td>
                <td>11</td>
                <td>11,5</td>
                <td>12</td>
                <td>12,5</td>
                <td>13</td>
                <td>13,5</td>
                <td>1Y</td>
                <td>1,5Y</td>
                <td>2Y</td>
                <td>2,5Y</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>Europe</th>
                <td>27,5</td>
                <td>28</td>
                <td>28,5</td>
                <td>29,5</td>
                <td>30</td>
                <td>31</td>
                <td>31,5</td>
                <td>32</td>
                <td>33</td>
                <td>33,5</td>
                <td>34</td>
                <td>35</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr>
                <th>CM</th>
                <td>16,5</td>
                <td>17</td>
                <td>17,5</td>
                <td>18</td>
                <td>18,5</td>
                <td>19</td>
                <td>19,5</td>
                <td>20</td>
                <td>20,5</td>
                <td>21</td>
                <td>21,5</td>
                <td>22</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr></tr>
              <tr class="th">
                <th colspan="18">Младенцы</th>
              </tr>
              <tr>
                <th>US</th>
                <td>2</td>
                <td>2,5</td>
                <td>3</td>
                <td>3,5</td>
                <td>4</td>
                <td>4,5</td>
                <td>5</td>
                <td>5,5</td>
                <td>6</td>
                <td>6,5</td>
                <td>7</td>
                <td>7,5</td>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
                <td>10</td>
              </tr>
              <tr></tr>
              <tr>
                <th>UK</th>
                <td>1,5</td>
                <td>2</td>
                <td>2,5</td>
                <td>3</td>
                <td>3,5</td>
                <td>4</td>
                <td>4,5</td>
                <td>5</td>
                <td>5,5</td>
                <td>6</td>
                <td>6,5</td>
                <td>7</td>
                <td>7,5</td>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
              </tr>
              <tr></tr>
              <tr>
                <th>Europe</th>
                <td>17</td>
                <td>18</td>
                <td>18,5</td>
                <td>19</td>
                <td>19,5</td>
                <td>20</td>
                <td>21</td>
                <td>21,5</td>
                <td>22</td>
                <td>22,5</td>
                <td>23,5</td>
                <td>24</td>
                <td>25</td>
                <td>25,5</td>
                <td>26</td>
                <td>26,5</td>
                <td>27</td>
              </tr>
              <tr></tr>
              <tr>
                <th>CM</th>
                <td>8</td>
                <td>8,5</td>
                <td>9</td>
                <td>9,5</td>
                <td>10</td>
                <td>10,5</td>
                <td>11</td>
                <td>11,5</td>
                <td>12</td>
                <td>12,5</td>
                <td>13</td>
                <td>13,5</td>
                <td>14</td>
                <td>14,5</td>
                <td>15</td>
                <td>15,5</td>
                <td>16</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import VProductCard from '@/components/VProductCard'

export default {
  components: {
    VProductCard,
  },
  async asyncData({ $axios, params }) {
    try {
      const productData = await $axios.get(`/products/${params.id}`)
      const product = productData.data.product
      const currentImage = 0

      return {
        product,
        currentImage,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  data: () => {
    return {
      url: process.env.IMG_URL,
      showTableSize: true,
    }
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.product.name} ${this.product.articul}`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${this.product.name}, ${this.product.articul}`,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      categories: 'codeBooks/categories',
    }),
    sizes() {
      const category = this.categories.find(
        (el) => el._id === this.product.category._id
      )
      const sizes = this.product.size
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
    isProductHaveDiscount() {
      return this.product?.discount
    },
    getCurrentPrice() {
      const discountPrice =
        this.product?.priceOut -
        (this.product?.priceOut * this.product?.discount) / 100
      return this.isProductHaveDiscount ? discountPrice : this.product.priceOut
    },
    isProductShose() {
      const category = this.categories.find(
        (el) => el._id === this.product.category.parent
      )
      return category?.name === 'Обувь'
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  &__wrapper {
    width: 960px;
    margin: 0 auto;

    @media (max-width: 960px) {
      width: 100%;
    }
  }

  &__body {
    padding: 18px;
    display: flex;

    @media (max-width: 425px) {
      display: block;
    }
  }

  &__images {
    margin-right: 40px;

    @media (max-width: 425px) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  &__image {
    overflow: hidden;
    width: 470px;
    height: 470px;

    @media (max-width: 425px) {
      margin: 0 auto;
      width: 350px;
      height: 350px;
    }

    @media (max-width: 375px) {
      width: 250px;
      height: 250px;
    }

    img {
      width: 100%;
    }
  }

  &__images-list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    div {
      width: 100px;
      margin: 0 5px;

      &.active {
        border: 1px solid black;
      }
    }

    img {
      width: 100%;
    }
  }

  &__info {
    flex-grow: 1;
  }

  &__title {
    h1 {
      font-size: 30px;
    }
  }

  &__articul {
    padding: 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #d9d7d7;
  }

  &__price {
    font-size: 18px;
    margin: 20% 0;

    h2 {
      display: inline;
    }

    span {
      color: #a2a2a2;
      text-decoration: line-through;
      font-weight: 600;
    }

    @media (max-width: 425px) {
      margin: 20px 0;
    }
  }

  &__size {
    padding-top: 10px;
    font-size: 18px;
    font-weight: 600;
    border-top: 1px solid #d9d7d7;
  }

  &__pair {
    padding: 18px;
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
    }

    &-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__size-table {
    width: 100%;
    padding-bottom: 20px;

    .size {
      &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px;
        background-color: #5fc9cb;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;

        img {
          &.active {
            transform: rotate(180deg);
          }
        }
      }

      &__subtitle {
        padding: 20px;
      }
    }

    .sizes-table {
      padding: 0 20px;
      overflow-y: hidden;

      @media (max-width: 425px) {
        padding: 0 4px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;

        th,
        tr {
          border-top: solid 1px #dddddd;
          border-bottom: solid 1px #dddddd;
          padding: 5px;

          @media (max-width: 425px) {
            padding: 1px;
          }
        }

        tr {
          th {
            background-color: #f6f6f6;
          }
        }
      }
    }
  }
}
</style>
