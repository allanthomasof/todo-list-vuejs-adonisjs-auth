import http from '@/services/http'

const actions = {
  async projectsByUserService () {
    try {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      const res = await http.get(process.env.VUE_APP_BASE_API_URL + '/projects/' + userInfo.id)
      return res
    } catch (error) {
      throw error.message
    }
  },
  async createProjectService(store, data) {
    try {
      const res = await http.post(process.env.VUE_APP_BASE_API_URL + '/projects', data)
      return res
    } catch (error) {
      throw error.message
    }
  },
  async deleteProjectService(store, id) {
    try {
      const res = await http.delete(process.env.VUE_APP_BASE_API_URL + '/projects/' + id)
      return res
    } catch (error) {
      throw error.message
    }
  },
}

export default { namespaced: true, actions }
