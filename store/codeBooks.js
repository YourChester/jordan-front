export const state = () => ({
  menuTree: [],
  genders: [],
  categories: [],
})

export const getters = {
  menuTree: (state) => state.menuTree,
  genders: (state) => state.genders,
  categories: (state) => state.categories,
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
}
