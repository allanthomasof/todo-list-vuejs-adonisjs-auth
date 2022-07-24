import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import projects from './projects'
import tasks from './tasks'

Vue.use(Vuex)

const modules = {
  auth,
  projects,
  tasks
}

export default new Vuex.Store({
  modules
})