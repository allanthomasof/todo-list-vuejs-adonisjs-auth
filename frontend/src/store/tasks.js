import http from '@/services/http'

const actions = {
  async createTaskService(store, data) {
    try {
      const res = await http.post(process.env.VUE_APP_BASE_API_URL + '/tasks', data)
      return res
    } catch (error) {
      throw error.message
    }
  },
  async updateTaskService(store, data) {
    try {
      const res = await http.put(process.env.VUE_APP_BASE_API_URL + '/tasks', data)
      return res
    } catch (error) {
      throw error.message
    }
  },
  async deleteTaskService(store, id) {
    try {
      const res = await http.delete(process.env.VUE_APP_BASE_API_URL + '/tasks/' + id)
      return res
    } catch (error) {
      throw error.message
    }
  },
}

export default { namespaced: true, actions }
