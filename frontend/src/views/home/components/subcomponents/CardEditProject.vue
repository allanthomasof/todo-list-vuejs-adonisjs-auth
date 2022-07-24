<template>
  <v-card width="500px">
    <v-card-title>Edit project name</v-card-title>
    <v-card-text>
      <v-text-field
        hide-details
        class="mt-2 mb-2"
        placeholder="Project name"
        style="background-color: white"
        v-on:keyup.enter="updateProject()"
        v-model="name"
        outlined
        dense
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      @click="closeDialog()"
      color="red darken-1"
      text
    >
      Cancel
    </v-btn>
    <v-btn
      @click="updateProject()"
      color="green darken-1"
      text
    >
      Save
    </v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: [
    'closeDialog',
    'project'
  ],

  data: () => {
    return {
      name: ''
    }
  },

  mounted() {
    this.name = this.project.name
  },

  methods: {
    ...mapActions('projects', ['updateProjectService']),
    async updateProject() {
      if (this.name !== this.project.name) {
        await this.updateProjectService({ id: this.project.id, name: this.name })
        this.closeDialog(true)
      } else {
        this.closeDialog()
      }
    }
  }
}
</script>

<style>

</style>