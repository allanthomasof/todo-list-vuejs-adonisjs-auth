<template>
  <v-main v-if="isLogged">
    <TodoListAppBar></TodoListAppBar>
    <v-container class="mt-2" fluid>
      <v-row no-gutters>
        <CardNewProject
          class="ma-2"
          :reloadProjects="listProjects"
        ></CardNewProject>
        <CardProjectTasks
          v-for="item in projects"
          :key="item.id"
          class="ma-2"
          :project="item"
          :reloadProjects="listProjects"
        ></CardProjectTasks>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    TodoListAppBar: () => import("./components/TodoListAppBar"),
    CardProjectTasks: () => import("./components/CardProjectTasks"),
    CardNewProject: () => import("./components/CardNewProject"),
  },

  data: () => {
    return {
      projects: []
    }
  },

  computed: {
    ...mapState({
      isLogged: state => state.auth.isLogged
    })
  },

  mounted () {
    !this.isLogged ? this.$router.push('/login') : this.listProjects()
  },

  methods: {
    ...mapActions('projects', ['projectsByUserService']),
    async listProjects() {
      try {
        this.projects = await this.projectsByUserService()
      } catch (error) {
        console.log('error')
      }
    }
  }
}
</script>

<style>
</style>
