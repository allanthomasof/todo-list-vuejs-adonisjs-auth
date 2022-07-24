<template>
  <v-card class="card-project d-flex align-center justify-center">
    <div
      class="px-4 mb-4"
      style="width: 100%;"
      no-gutters
    >
      <h3>Create a new project</h3>
      <v-text-field
        hide-details
        class="mt-2 mb-2"
        placeholder="Project name"
        style="background-color: white"
        v-on:keyup.enter="createProject()"
        v-model="newProject"
        outlined
        dense
      >
      </v-text-field>
      <v-btn
        @click="createProject()"
        color="success"
        width="90"
        elevation="0"
        height="41"
        block
      >
        Add
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'reloadProjects'
  ],

  data: () => {
    return {
      newProject: ''
    }
  },

  methods: {
    ...mapActions('projects', ['createProjectService']),
    async createProject() {
      try {
        await this.createProjectService({
          name: this.newProject,
          user_id: JSON.parse(window.localStorage.getItem('userInfo')).id
        })
        this.newProject = ''
      } catch (error) {
        alert(error)
      }
      this.reloadProjects()
    }
  }
}
</script>

<style scoped>
.card-project {
  width: 400px;
  max-width: 400px;
  height: 320px;
  background-color: #EEEEEE;
}
.card-content {
  text-align: left;
}
</style>