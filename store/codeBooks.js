export const state = () => ({
  menuTree: [],
  genders: [],
  categories: [],
  sizes: [],
  sellers: [],
  roles: [],
})

export const getters = {
  menuTree: (state) => state.menuTree,
  genders: (state) => state.genders,
  categories: (state) => state.categories,
  sizes: (state) => state.sizes,
  sellers: (state) => state.sellers,
  roles: (state) => state.roles,
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
  SET_SELLER(state, value) {
    state.sellers = value
  },
  SET_ROLES(state, value) {
    state.roles = value
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
  setSellers({ commit }, value) {
    commit('SET_SELLER', value)
  },
  setRoles({ commit }, value) {
    commit('SET_ROLES', value)
  },
}
