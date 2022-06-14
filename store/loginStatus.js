let timeout = null
export const state = () => ({})

export const getters = {}

export const mutations = {
  SET_TIMEOUT() {
    timeout = setTimeout(async () => {
      await this.$auth.logout()
      this.$router.push('/admin-panel/login')
      clearTimeout(timeout)
    }, 1000 * 60 * 10)
  },
  UPDATE_TIMEOUT(state) {
    clearTimeout(timeout)
  },
  async CLEAR_STORE_TIMEOUT(state) {
    await this.$auth.logout()
    clearTimeout(timeout)
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
