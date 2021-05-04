<template>
  <div>
    <div class="header__wrapper">
      <div class="header">
        <div class="header__info">
          <div v-show="address" class="address">
            <img
              class="address__icon"
              src="~/assets/img/location_icon.png"
              alt="Адресс"
            />
            <div class="address__text">
              {{ address }}
            </div>
          </div>
          <div v-show="firstPhone" class="first__phone">
            <a :href="`tel:${firstPhone}`">{{ firstPhone }}</a>
          </div>
          <div v-show="secondPhone" class="second__phone">
            <a :href="`tel:${secondPhone}`">{{ secondPhone }}</a>
          </div>
        </div>
        <div class="header__actions">
          <button class="login">Войти</button>
          <button class="registration">Регистрация</button>
        </div>
      </div>
    </div>
    <div class="logo__wrapper">
      <div class="logo">
        <NuxtLink to="/">
          <img src="~/assets/img/logo.png" alt="Логотип jordan-brand" />
        </NuxtLink>
      </div>
    </div>
    <div class="menu__wrapper">
      <div class="menu">
        <template v-for="menuItem in menuItems">
          <div
            :key="menuItem._id"
            class="menu__item"
            @mouseover="visibilityMenuItem(menuItem.key, true)"
            @mouseleave="visibilityMenuItem(menuItem.key, false)"
          >
            <div class="menu__item-text">
              {{ menuItem.name }}
            </div>
            <div
              v-show="menuItemsVisibility[menuItem.key]"
              class="menu__item-categories"
            >
              <template v-for="category in menuItem.categories">
                <div :key="category._id" class="category__item">
                  <div class="category__item-text">
                    {{ category.name }}
                  </div>
                  <div
                    v-for="childCategory in category.categories"
                    :key="`${menuItem.key}${childCategory._id}`"
                    class="category__item-child"
                  >
                    {{ childCategory.name }}
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: 'Донецк, пр. Титова, 8б',
      firstPhone: '+38 095 161 72 67',
      secondPhone: '+38 071 361 97 67',
      menuItems: [
        {
          _id: 1,
          name: 'Мужчины',
          key: 'men',
          categories: [
            {
              _id: 4,
              name: 'Обувь',
              categories: [
                {
                  _id: 7,
                  name: 'Категория',
                },
              ],
            },
            {
              _id: 5,
              name: 'Одежда',
              categories: [
                {
                  _id: 8,
                  name: 'Категория',
                },
              ],
            },
            {
              _id: 6,
              name: 'Аксессуары',
              categories: [
                {
                  _id: 9,
                  name: 'Категория',
                },
              ],
            },
          ],
        },
        {
          _id: 2,
          name: 'Женщины',
          key: 'women',
          categories: [
            {
              _id: 4,
              name: 'Обувь',
              categories: [
                {
                  _id: 7,
                  name: 'Категория',
                },
              ],
            },
            {
              _id: 5,
              name: 'Одежда',
              categories: [
                {
                  _id: 8,
                  name: 'Категория',
                },
              ],
            },
            {
              _id: 6,
              name: 'Аксессуары',
              categories: [
                {
                  _id: 9,
                  name: 'Категория',
                },
              ],
            },
          ],
        },
        {
          _id: 3,
          name: 'Дети',
          key: 'children',
          categories: [
            {
              _id: 4,
              name: 'Обувь',
              categories: [
                {
                  _id: 7,
                  name: 'Категория',
                },
              ],
            },
            {
              _id: 5,
              name: 'Одежда',
              categories: [
                {
                  _id: 8,
                  name: 'Категория',
                },
              ],
            },
            {
              _id: 6,
              name: 'Аксессуары',
              categories: [
                {
                  _id: 9,
                  name: 'Категория',
                },
              ],
            },
          ],
        },
      ],
      menuItemsVisibility: {
        men: false,
        women: false,
        children: false,
      },
    }
  },
  methods: {
    visibilityMenuItem(key, state) {
      this.menuItemsVisibility[key] = state
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  max-width: 960px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  &__wrapper {
    color: white;
    background-color: #282828;

    a {
      text-decoration: none;
      color: white;
    }
  }

  &__info {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .address {
      display: flex;
      align-items: center;

      &__text {
        margin-left: 5px;
      }
    }
  }

  &__actions {
    display: flex;

    button {
      padding: 10px 15px;
      border: none;
      background-color: #4e4e4e;
      color: white;
      cursor: pointer;

      &:hover {
        color: #5fc9cb;
      }
    }
  }
}

.logo {
  max-width: 960px;
  margin: 0 auto;

  &__wrapper {
    padding: 5px 0;
  }
}

.menu {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;

  &__wrapper {
    background-color: white;
  }

  &__item {
    color: black;
    cursor: pointer;

    &-text {
      padding: 15px;
      font-size: 18px;

      &:hover {
        color: #5fc9cb;
      }
    }

    &-categories {
      position: absolute;
      left: 0;
      width: 960px;
      display: flex;
      justify-content: space-between;
      background-color: white;

      .category {
        &__item {
          &-text,
          &-child {
            padding: 5px 15px;
            font-size: 18px;

            &:hover {
              color: #5fc9cb;
            }
          }
        }
      }
    }
  }
}
</style>
