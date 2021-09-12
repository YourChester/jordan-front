export const state = () => ({
  timeout: null,
})

export const getters = {}

export const mutations = {
  SET_TIMEOUT(state) {
    state.timeout = setTimeout(async () => {
      await this.$auth.logout()
      this.$router.push('/admin-panel/login')
    }, 1000 * 60 * 10)
  },
  UPDATE_TIMEOUT(state) {
    clearTimeout(state.timeout)
  },
  CLEAR_STORE_TIMEOUT(state) {
    clearTimeout(state.timeout)
  },
}

export const actions = {
  setTimeout({ commit }) {
    commit('SET_TIMEOUT')
  },
  updateTimeout({ commit }) {
    commit('UPDATE_TIMEOUT')
    commit('SET_TIMEOUT')
  },
  clearStoreTimeout({ commit }) {
    commit('CLEAR_STORE_TIMEOUT')
  },
}
