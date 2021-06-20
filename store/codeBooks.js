export const state = () => ({
  menuTree: [],
  genders: [],
  categories: [],
  sizes: [],
})

export const getters = {
  menuTree: (state) => state.menuTree,
  genders: (state) => state.genders,
  categories: (state) => state.categories,
  sizes: (state) => state.sizes,
}

export const mutations = {
  SET_MENU_TREE(state, value) {
    state.menuTree = value
  },
  SET_GENDERS(state, value) {
    state.genders = value
  },
  SET_CATEGORIES(state, value) {
    state.categories = value
  },
  SET_SIZES(state, value) {
    state.sizes = value
  },
}

export const actions = {
  setMenuTree({ commit }, value) {
    commit('SET_MENU_TREE', value)
  },
  setGenders({ commit }, value) {
    commit('SET_GENDERS', value)
  },
  setCategories({ commit }, value) {
    commit('SET_CATEGORIES', value)
  },
  setSizes({ commit }, value) {
    commit('SET_SIZES', value)
  },
}
