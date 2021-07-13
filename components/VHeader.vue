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
    <div class="mobile-menu__wrapper">
      <div class="mobile-menu__head">
        <div class="mobile-menu__btn" @click="menuVisibility = !menuVisibility">
          <svg
            height="30px"
            width="30px"
            viewBox="0 -53 384 384"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
          </svg>
        </div>
        <div class="mobile-menu__logo">
          <NuxtLink to="/">
            <img src="~/assets/img/logo.png" alt="Jordan-brand" />
          </NuxtLink>
        </div>
      </div>
      <div v-show="menuVisibility" class="mobile-menu">
        <div class="mobile-menu__tabs">
          <div
            v-for="(menuItem, index) in menuItems"
            :key="menuItem._id"
            class="mobile-menu__tab"
            :class="activeGender === index ? 'active' : ''"
            @click="activeGender = index"
          >
            {{ menuItem.name }}
          </div>
        </div>
        <div v-if="menuItems.length" class="mobile-menu__list-categories">
          <div
            v-for="category in menuItems[activeGender].categories"
            :key="category._id"
            class="mobile-menu__list-item"
          >
            <div class="title">
              <NuxtLink
                :to="`/${menuItems[activeGender]._id}/${category._id}`"
                @click.native="menuVisibility = !menuVisibility"
              >
                {{ category.name }}
              </NuxtLink>
            </div>
            <div
              v-for="childCategory in category.childs"
              :key="childCategory._id"
              class="mobile-menu__list-child"
            >
              <NuxtLink
                :to="`/${menuItems[activeGender]._id}/${childCategory._id}`"
                @click.native="menuVisibility = !menuVisibility"
              >
                {{ childCategory.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="logo__wrapper">
      <div class="logo">
        <NuxtLink to="/">
          <img src="~/assets/img/logo.png" alt="Jordan-brand" />
        </NuxtLink>
      </div>
    </div>
    <div class="menu__wrapper">
      <div class="menu">
        <template v-for="(menuItem, index) in menuItems">
          <div
            :key="menuItem._id"
            class="menu__item"
            @mouseover="visibilityMenuItem(index, true)"
            @mouseleave="visibilityMenuItem(index, false)"
          >
            <NuxtLink
              :to="`/${menuItem._id}`"
              tag="div"
              class="menu__item-text"
              @click.native="visibilityMenuItem(index, false)"
            >
              {{ menuItem.name }}
            </NuxtLink>
            <div
              v-show="menuItemsVisibility[index]"
              class="menu__item-categories"
            >
              <template v-for="category in menuItem.categories">
                <div :key="category._id" class="category__item">
                  <NuxtLink
                    tag="div"
                    :to="`/${menuItem._id}/${category._id}`"
                    class="category__item-text"
                    @click.native="visibilityMenuItem(index, false)"
                  >
                    {{ category.name }}
                  </NuxtLink>
                  <NuxtLink
                    v-for="childCategory in category.childs"
                    :key="`${index}${childCategory._id}`"
                    tag="div"
                    :to="`/${menuItem._id}/${childCategory._id}`"
                    class="category__item-child"
                    @click.native="visibilityMenuItem(index, false)"
                  >
                    {{ childCategory.name }}
                  </NuxtLink>
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
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      menuVisibility: false,
      address: 'Донецк, пр. Титова, 8б',
      firstPhone: '+38 095 161 72 67',
      secondPhone: '+38 071 361 97 67',
      menuItemsVisibility: [false, false, false, false],
      activeGender: 0,
    }
  },
  computed: {
    ...mapGetters({ menuItems: 'codeBooks/menuTree' }),
  },
  methods: {
    visibilityMenuItem(index, state) {
      this.$set(this.menuItemsVisibility, index, state)
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

  @media (max-width: 425px) {
    height: 80px;
  }

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

    @media (max-width: 425px) {
      flex-direction: column;
      justify-content: space-around;
    }

    .address {
      display: flex;
      align-items: center;

      &__text {
        margin-left: 5px;
      }
    }

    @media (max-width: 960px) {
      width: 70%;
      padding: 0 10px;
    }

    @media (max-width: 425px) {
      font-size: 12px;
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

  @media (max-width: 960px) {
    display: none;
  }

  &__wrapper {
    padding: 5px 0;

    @media (max-width: 425px) {
      padding: 0;
    }
  }
}

.menu {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 960px) {
    display: none;
  }

  &__wrapper {
    background-color: #f3f3f3;
  }

  &__item {
    color: black;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: white;
    }

    &-text {
      padding: 15px;

      &:hover {
        color: #5fc9cb;
      }
    }

    &-categories {
      z-index: 100;
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

            &:hover {
              color: #5fc9cb;
            }
          }
        }
      }
    }
  }
}

.mobile-menu {
  width: 100%;
  z-index: 1000;
  top: 80px;
  left: 0;
  padding-bottom: 100px;
  position: absolute;
  background-color: #f3f3f3;

  &__tabs {
    display: flex;
    justify-content: space-between;
  }

  &__tab {
    flex-grow: 1;
    padding: 10px 0;
    font-size: 18px;
    text-align: center;

    &.active {
      border-bottom: 4px solid #5fc9cb;
    }
  }

  &__list {
    &-categories {
      display: flex;
      justify-content: space-between;

      @media (max-width: 425px) {
        padding: 0 20px;
      }
    }

    &-item {
      flex-grow: 1;

      .title a {
        display: block;
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        text-decoration: none;
        color: black;
      }
    }

    &-child a {
      display: block;
      text-align: center;
      padding: 10px 0;
      font-size: 16px;
      text-decoration: none;
      color: black;
    }
  }

  &__wrapper {
    display: none;
    background-color: #f3f3f3;
    padding: 10px;
    position: relative;

    @media (max-width: 960px) {
      display: block;
    }
  }

  &__head {
    display: flex;
    align-items: center;
  }

  &__logo {
    height: 60px;
    margin: 0 20px;

    img {
      height: 100%;
    }
  }

  &__btn {
    cursor: pointer;
  }
}
</style>
