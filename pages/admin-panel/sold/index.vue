<template>
  <div class="sold">
    <client-only>
      <h1>Продажи</h1>
      <div class="sold__filter">
        <div>
          <select v-model="payload.seller" @change="getList">
            <option value="">выберите продавца</option>
            <option
              v-for="seller in getOnlySeller"
              :key="seller._id"
              :value="seller._id"
            >
              {{ seller.name }}
            </option>
          </select>
          <input
            v-model="payload.searchText"
            style="margin-left: 20px"
            type="text"
            placeholder="Поиск"
            @change="getList"
          />
        </div>
        <div>
          <button @click="$router.push('/admin-panel/sold/new-sold')">
            Добавить продажу
          </button>
        </div>
      </div>
      <div class="sold__table-wrapper">
        <table class="sold__table">
          <tbody>
            <template v-for="group in solds">
              <tr
                :key="group._id"
                style="background-color: green; color: white; height: 50px"
              >
                <td colspan="6">Касса: {{ group.totalPrice }} р.</td>
                <td colspan="7">
                  {{ group._id }}
                </td>
              </tr>
              <tr :key="group._id + 'header'">
                <td colspan="2">Продавцы</td>
                <td colspan="2">Карта покупателя</td>
                <td colspan="2">Дата Продажи</td>
                <td colspan="3">Сумма покупки</td>
                <td v-show="getRoleKey === 'admin'" colspan="2">Доход</td>
                <td colspan="2">Действия</td>
              </tr>
              <template v-for="sold in group.solds">
                <tr
                  :key="sold._id + group._id"
                  style="background-color: grey; color: white"
                >
                  <td colspan="2">
                    {{
                      sold.seller_info && sold.seller_info.length
                        ? sold.seller_info.map((el) => el.name).join(', ')
                        : ''
                    }}
                  </td>
                  <td colspan="2">
                    {{
                      sold.card_info && sold.card_info.length
                        ? sold.card_info.map((el) => el.code).join(', ')
                        : ''
                    }}
                  </td>
                  <td colspan="2">
                    {{ getFormatedDateWithTime(sold.date) }}
                  </td>
                  <td colspan="3">
                    {{ sold.totalPrice }}
                  </td>
                  <td v-show="getRoleKey === 'admin'" colspan="2">
                    {{ sold.totalIncome }}
                  </td>
                  <td>
                    <NuxtLink
                      class="link"
                      :to="`/admin-panel/sold/${sold._id}`"
                      tag="div"
                    >
                      E
                    </NuxtLink>
                  </td>
                  <td>
                    <button
                      class="link"
                      style="color: white"
                      @click="deleteSold(sold._id)"
                    >
                      X
                    </button>
                  </td>
                </tr>
                <tr :key="sold._id + group._id + 'producthead'">
                  <th rowspan="2">Тип</th>
                  <th rowspan="2">Бренд</th>
                  <th rowspan="2">Название</th>
                  <th rowspan="2">Артикул</th>
                  <th v-show="getRoleKey === 'admin'" rowspan="2">Поставщик</th>
                  <th :colspan="getRoleKey === 'admin' ? 5 : 3">Цена</th>
                  <th rowspan="2">Размер</th>
                  <th rowspan="2">Дата продажи</th>
                  <th rowspan="2" :colspan="getRoleKey === 'admin' ? 0 : 2">
                    Пол
                  </th>
                </tr>
                <tr :key="sold._id + group._id + 'subproducthead'">
                  <th v-show="getRoleKey === 'admin'">Прих.</th>
                  <th>Витрина</th>
                  <th>Прод.</th>
                  <th>Скидка</th>
                  <th v-show="getRoleKey === 'admin'">Доход</th>
                </tr>
                <template v-for="product in sold.products_info">
                  <tr :key="product._id">
                    <td>
                      {{ getCategoryName(product.category) }}
                    </td>
                    <td>
                      {{ product.brand }}
                    </td>
                    <td>
                      {{ product.name }}
                    </td>
                    <td>
                      <div class="articul">
                        <img
                          v-show="
                            product &&
                            product.pairImages &&
                            product.pairImages.length
                          "
                          src="~/assets/img/imgpare.jpeg"
                          width="15px"
                          alt="Картинка"
                          class="pair"
                          @mouseover="
                            visibilityImageModal(product.pairImages[0], true)
                          "
                          @mouseleave="visibilityImageModal('', false)"
                        />
                        <div>{{ product.articul }}</div>
                        <img
                          v-show="
                            product && product.images && product.images.length
                          "
                          src="~/assets/img/imgart.jpeg"
                          width="20px"
                          alt="Картинка"
                          class="image"
                          @mouseover="
                            visibilityImageModal(product.images[0], true)
                          "
                          @mouseleave="visibilityImageModal('', false)"
                        />
                      </div>
                    </td>
                    <td v-show="getRoleKey === 'admin'">
                      {{ product.provider }}
                    </td>
                    <td v-show="getRoleKey === 'admin'">
                      {{ product.priceIn }}
                    </td>
                    <td>
                      {{ product.priceOut }}
                    </td>
                    <td>
                      {{ product.priseSold }}
                    </td>
                    <td>
                      {{ product.discount }}
                    </td>
                    <td v-show="getRoleKey === 'admin'">
                      {{
                        Math.round(
                          Number(product.priseSold) - Number(product.priceIn)
                        )
                      }}
                    </td>
                    <td>
                      {{ product.size }}
                    </td>
                    <td>
                      {{ getFormatedDateWithTime(product.dateOut) }}
                    </td>
                    <td :colspan="getRoleKey === 'admin' ? 0 : 2">
                      <label v-for="gender in genders" :key="gender._id">
                        {{ gender.name[0] }}
                        <input
                          v-model="product.gender"
                          type="checkbox"
                          name=""
                          disabled
                          :value="gender._id"
                          @change="changeGender(product)"
                        />
                      </label>
                    </td>
                  </tr>
                </template>
                <tr :key="sold._id + group._id + 'br'">
                  <td colspan="13" style="background-color: yellow"></td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
      <div class="sold__pagination">
        <div class="sold__pagination-perpage">
          <select v-model="perPage" @change="getNewPerPage">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
          </select>
        </div>
        <div class="sold__pagination-total">Всего: {{ totalCount }}</div>
        <div v-show="totalPages > 1" class="sold__pagination-page_control">
          <div
            v-show="currentPage !== 1"
            @click="currentPage = currentPage - 1"
          >
            &lt;
          </div>
          <div
            v-for="page in totalPages"
            :key="page"
            :class="currentPage === page ? 'active' : ''"
            @click="currentPage = page"
          >
            {{ page }}
          </div>
          <div
            v-show="currentPage !== totalPages"
            @click="currentPage = currentPage + 1"
          >
            &gt;
          </div>
        </div>
      </div>
      <div v-if="modalVisibility" class="sold__image-alert">
        <img width="100%" height="100%" :src="`${url}${imageUrl}`" />
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDateWithTime, getFormatedDate } from '@/assets/utils/date'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const {
        data: { solds, totalCount, totalPages },
      } = await $axios.get('/admin/solds', {
        params: {
          sellers: '',
          search: '',
          limit: 100,
          page: 1,
        },
      })

      return {
        currentPage: 1,
        perPage: 100,
        totalCount,
        totalPages,
        solds,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  data() {
    return {
      payload: {
        seller: '',
        searchText: '',
      },
      imageUrl: '',
      url: process.env.IMG_URL,
      modalVisibility: false,
      debounceSerch: null,
    }
  },
  computed: {
    ...mapGetters({
      genders: 'codeBooks/genders',
      sellers: 'codeBooks/sellers',
      categories: 'codeBooks/categories',
    }),
    getOnlySeller() {
      return this.sellers.filter((el) => el.role.key === 'manager')
    },
    getRoleKey() {
      const { role } = this.$auth.$state.user
      return role?.key
    },
  },
  watch: {
    currentPage() {
      this.getList()
    },
  },
  methods: {
    visibilityImageModal(imgUrl, state) {
      this.imageUrl = imgUrl
      this.modalVisibility = state
    },
    getCategoryName(id) {
      return this.categories.find((el) => el._id === id)?.name || ''
    },
    getFormatedDateWithTime(date) {
      return getDateWithTime(date)
    },
    getDate(date) {
      return getFormatedDate(date)
    },
    getNewPerPage() {
      this.currentPage = 1
      this.getList()
    },
    async getList() {
      try {
        const {
          data: { solds, totalCount, totalPages },
        } = await this.$axios.get('/admin/solds', {
          params: {
            seller: this.payload.seller,
            search: this.payload.searchText,
            limit: this.perPage,
            page: this.currentPage,
          },
        })
        this.solds = solds
        this.totalCount = totalCount
        this.totalPages = totalPages
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async deleteSold(id) {
      try {
        await this.$axios.delete(`/admin/solds/${id}`)
        this.getList()
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sold {
  padding: 20px;

  &__filter {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__table {
    border-spacing: 0;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;

      .link {
        text-decoration: underline;
        cursor: pointer;
        border: none;
        background-color: transparent;
      }

      .articul {
        display: flex;
        justify-content: center;
        align-items: center;

        .pair {
          margin-right: 10px;
        }

        .image {
          margin-left: 10px;
        }
      }
    }

    &-wrapper {
      margin-top: 15px;
    }
  }

  &__pagination {
    &-perpage {
      margin-top: 10px;
    }

    &-total {
      padding: 10px 0;
      font-size: 16px;
    }

    &-page_control {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;

      div {
        padding: 5px;

        &.active {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }

  &__image-alert {
    position: fixed;
    top: 100px;
    left: 50px;
    width: 520px;
    height: 520px;
    padding: 10px;
    border: 1px solid black;
    background-color: white;
  }
}
</style>
