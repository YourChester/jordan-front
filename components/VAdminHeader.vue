<template>
  <div class="admin-header__wrapper">
    <div class="admin-header">
      <table class="admin-header__link">
        <td
          v-for="link in links"
          v-show="link.role.includes(getRoleKey)"
          :key="link.name"
          exact
          class="link"
        >
          <nuxt-link
            v-show="link.path"
            :to="link.path"
            active-class="active"
            exact
          >
            {{ link.name }}
          </nuxt-link>
          <button v-show="!link.path" @click="logOut">
            {{ link.name }}
          </button>
        </td>
      </table>
      <table v-if="getRoleKey === 'admin'" class="admin-header__admin-link">
        <td v-for="link in adminLinks" :key="link.name" exact class="link">
          <nuxt-link
            v-show="link.path"
            :to="link.path"
            active-class="active"
            exact
          >
            {{ link.name }}
          </nuxt-link>
        </td>
      </table>
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
          role: ['admin', 'manager'],
        },
        {
          name: 'Приход',
          path: '/admin-panel/products/new',
          role: ['admin', 'manager'],
        },
        {
          name: 'Продажи',
          path: '/admin-panel/sold',
          role: ['admin', 'manager'],
        },
        {
          name: 'Карты',
          path: '/admin-panel/discount-card',
          role: ['admin'],
        },
        {
          name: 'Новые карты',
          path: '/admin-panel/discount-card/new-discount-card',
          role: ['admin', 'manager'],
        },
        {
          name: 'На сайт',
          path: '/',
          role: ['admin', 'manager'],
        },
        {
          name: 'Выход',
          path: '',
          role: ['admin', 'manager'],
        },
      ],
      adminLinks: [
        {
          name: 'Все',
          path: '/admin-panel/products/all',
        },
        {
          name: 'Расходы',
          path: '/admin-panel/costs',
        },
        {
          name: 'Статистика',
          path: '/admin-panel/statistic',
        },
        {
          name: 'Менеджеры',
          path: '/admin-panel/manager',
        },
        {
          name: 'Группы',
          path: '/admin-panel/category',
        },
      ],
    }
  },
  computed: {
    getRoleKey() {
      const { role } = this.$auth.$state.user
      return role?.key
    },
  },
  methods: {
    async logOut() {
      await this.$auth.logout()
      this.$store.dispatch('loginStatus/clearStoreTimeout')
      this.$router.push('/admin-panel/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-header {
  height: 100%;

  &__link {
    border-spacing: 0;
    border-collapse: collapse;
    margin: 20px;

    th,
    td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;

      a {
        text-decoration: none;
        color: black;

        &.active {
          font-weight: 600;
        }
      }

      button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: transparent;
      }
    }
  }

  &__admin-link {
    border-spacing: 0;
    border-collapse: collapse;
    margin: 20px;

    th,
    td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;

      a {
        text-decoration: none;
        color: black;

        &.active {
          font-weight: 600;
        }
      }

      button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: transparent;
      }

      @media (max-width: 425px) {
        padding: 10px;
        a {
          font-size: 24px;
        }
      }
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
