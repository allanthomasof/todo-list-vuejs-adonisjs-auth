import axios from 'axios'

const config = {
  baseURL: process.env.VUE_APP_BASE_API_URL || 'http://localhost:3333'
}

const http = axios.create(config)

export async function requestError (promisse) {
  try {
    const response = await promisse
    return response.data || {}
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ? error.response.data.message : error.message
    throw new Error(message)
  }
}

export default {
  http,
  async get (url) {
    return requestError(http.get(url))
  },
  async post (url, data) {
    return requestError(http.post(url, data))
  },
  async put (url, data) {
    return requestError(http.put(url, data))
  },
  async delete (url) {
    return requestError(http.delete(url))
  }
}
