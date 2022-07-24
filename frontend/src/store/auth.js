import http from '@/services/http'

const state = {
  isLogged: window.localStorage.getItem('userInfo') != null ? true : false,
  loggedInUser:
    window.localStorage.getItem('userInfo') != null
      ? JSON.parse(window.localStorage.getItem('userInfo'))
      : null,
}

const mutations = {
  setIsLogged (state) {
    state.isLogged = !state.isLogged
  }
}

const actions = {
  async registerService (store, data) {
    try {
      return http.post(process.env.VUE_APP_BASE_API_URL + '/register', data)
    } catch (error) {
      throw error.message
    }
  },
  async loginService ({ commit }, data) {
    try {
      const res = await http.post(process.env.VUE_APP_BASE_API_URL + '/login', data)
      window.localStorage.setItem('userInfo', JSON.stringify(res))
      commit('setIsLogged')
      return res
    } catch (error) {
      throw error.message
    }
  },
  async logoutService ({ commit }) {
    window.localStorage.removeItem('userInfo')
    commit('setIsLogged')
  },
}

export default { namespaced: true, state, mutations, actions }
