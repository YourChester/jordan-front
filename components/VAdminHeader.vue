<template>
  <div class="admin-header__wrapper">
    <div class="admin-header">
      <div class="admin-header__title">Панель администратора</div>
      <div class="admin-header__link">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          exact
          class="link"
          :to="link.path"
          tag="div"
          active-class="active"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
      <div class="admin-header__user">
        <div class="user__info">
          {{ getSellerShorName }} - {{ getSellerRole }}
        </div>
        <div class="user__actions">
          <button @click="$router.push('/')">На сайт</button>
          <button @click="logOut">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Склад',
          path: '/admin-panel/products',
        },
        {
          name: 'Все',
          path: '/admin-panel/products/all',
        },
        {
          name: 'Приход',
          path: '/admin-panel/products/new',
        },
        {
          name: 'Продажи',
          path: '/admin-panel/sold',
        },
        {
          name: 'Карты',
          path: '/admin-panel/discount-card',
        },
        {
          name: 'Новые карты',
          path: '/admin-panel/discount-card/new-discount-card',
        },
        {
          name: 'Менеджеры',
          path: '/admin-panel/manager',
        },
      ],
    }
  },
  computed: {
    getSellerShorName() {
      const { name } = this.$auth.$state.user
      return `${name}`
    },
    getSellerRole() {
      const { role } = this.$auth.$state.user
      return role?.name
    },
  },
  methods: {
    async logOut() {
      await this.$auth.logout()
      this.$router.push('/admin-panel/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__wrapper {
    height: 62px;
    color: white;
    background-color: #282828;
  }

  &__title {
    padding-left: 20px;
    font-size: 18px;
    font-weight: 600;
  }

  &__link {
    height: 100%;
    display: flex;

    .link {
      height: 100%;
      padding: 20px 10px;
      color: white;
      text-decoration: none;
      cursor: pointer;
      font-size: 16px;
    }

    .active {
      font-weight: 600;
      border-bottom: 3px solid white;
    }
  }

  &__user {
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .user {
      &__actions {
        button {
          cursor: pointer;
          padding: 0;
          outline: none;
          border: none;
          color: white;
          text-decoration: underline;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
