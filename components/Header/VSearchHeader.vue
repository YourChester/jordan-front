<template>
  <form class="search" @submit="onSubmiteSearch">
    <div
      class="search__input__wrap"
      :class="{ 'search__input__wrap--view': isSearchVisible }"
    >
      <input v-model="search" class="search__input" placeholder="Поиск" />
    </div>
    <div
      class="search__btn"
      :class="{ 'search__btn--close': isSearchVisible }"
      @click="toggleSearch"
    ></div>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      search: '',
      isSearchVisible: false,
    }
  },
  methods: {
    onSubmiteSearch(e) {
      e.preventDefault()
      this.$router.push({
        path: '/all',
        query: {
          search: this.search,
        },
      })
      this.search = ''
      this.toggleSearch()
    },
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible
      this.$emit('on-open-search', !this.isSearchVisible)
    },
  },
}
</script>

<style lang="scss">
.search {
  display: flex;
  align-items: center;

  @media (max-width: 425px) {
    flex-grow: 1;
  }

  &__input {
    width: 250px;
    font-size: 14px;
    padding: 6px 10px;
    padding-right: 35px;
    outline: none;
    border: none;
    border-radius: 10px;

    @media (max-width: 425px) {
      width: 100%;
      padding: 10px;
    }

    &__wrap {
      position: relative;

      &::after {
        content: ' ';
        position: absolute;
        top: calc(50% - 10px);
        right: 10px;
        width: 20px;
        height: 20px;
        background: url('~/assets/img/search_icon.svg') no-repeat center top;
        background-size: 100% 100%;
      }

      @media (max-width: 425px) {
        display: none;

        &--view {
          display: block !important;
          padding-left: 20px;
          width: calc(100% - 40px);
        }
      }
    }
  }

  &__btn {
    display: none;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-left: 10px;
    background: url('~/assets/img/search_icon_white.svg') no-repeat center top;
    background-size: 100% 100%;

    &--close {
      background: url('~/assets/img/close_white.svg') no-repeat center top;
      background-size: 70% 70%;
    }

    @media (max-width: 425px) {
      display: block;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
}
</style>
