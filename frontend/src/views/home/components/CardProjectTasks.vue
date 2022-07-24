<template>
  <v-card class="card-project-tasks">
    <v-app-bar elevation="0" class="pr-2" dense>
      <h5>{{ project.name }}</h5>
      <v-spacer/>
      <v-btn icon small @click="() => modalEdit = true">
        <v-icon color="blue" size="20">mdi-pen</v-icon>
      </v-btn>
      <div style="width: 5px"></div>
      <v-btn icon small @click="deleteProject()">
        <v-icon color="blue" size="20">mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="card-content px-4 py-2">
      <div v-if="project.tasks.length" class="py-1">
        To Do
        <div v-for="task in project.tasks" :key="task.id">
          <v-row v-if="!task.checked" no-gutters>
            <v-checkbox
              class="app-checkbox"
              v-model="task.checked"
              dense
              :label="task.description"
              @click="updateTask(task)"
            ></v-checkbox>
            <v-btn icon small @click="deleteTask(task)" style="margin-top: 5px; margin-left: 5px">
              <v-icon color="gray" size="18">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider class="my-3"></v-divider>
        Done
        <div v-for="task in project.tasks" :key="task.created_at">
          <v-row v-if="task.checked" no-gutters>
            <v-checkbox
              disabled
              class="app-checkbox"
              v-model="task.checked"
              dense
              :label="task.description"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  size="20"
                >
                  mdi-calendar
                </v-icon>
              </template>
              <span>Finished in: {{ formatDate(task.finish_date) }}</span>
            </v-tooltip>
          </v-row>
        </div>
      </div>
      <div v-else class="py-1" style="color: gray">
        No tasks have been registered
      </div>
    </div>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-4">
      <v-text-field
        hide-details
        class="mr-4"
        placeholder="New task"
        v-model="description"
        v-on:keyup.enter="createTask()"
        outlined
        dense
      >
      </v-text-field>
      <v-btn @click="createTask()" color="success" width="90" elevation="0" height="41">
        Add
      </v-btn>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="modalEdit" width="400px">
      <CardEditProject
        :project="project"
        :closeDialog="(reload) => {
          modalEdit = false;
          if (reload) {
            reloadProjects();
          }
        }"
      ></CardEditProject>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  props: [
    'project',
    'reloadProjects'
  ],

  components: {
    'CardEditProject': () => import('./subcomponents/CardEditProject')
  },

  data: () => {
    return {
      description: '',
      snackbarText: '',
      snackbar: false,
      modalEdit: false,
    }
  },

  methods: {
    ...mapActions('projects', ['deleteProjectService']),
    ...mapActions('tasks', ['createTaskService', 'updateTaskService', 'deleteTaskService']),
    formatDate(date) {
      return ' ' + moment(date).format('YYYY/MM/DD, h:mm a')
    },
    async deleteProject() {
      try {
        await this.deleteProjectService(this.project.id)
      } catch (errorMessage) {
        this.snackbar = true
        this.snackbarText = errorMessage
      }
      this.reloadProjects()
    },
    async createTask() {
      if (this.description.length) {
        try {
          await this.createTaskService({
            description: this.description,
            project_id: this.project.id
          })
          this.description = ''
        } catch (errorMessage) {
          this.snackbar = true
          this.snackbarText = errorMessage
        }
        this.reloadProjects()
      } else {
        this.snackbar = true
        this.snackbarText = 'Please enter the task name'
      }
    },
    updateTask(task) {
      task.checked ? task.finish_date = new Date() : task.finish_date = null
      this.updateTaskService({
        id: task.id,
        checked: task.checked,
        finish_date: task.finish_date,
      })
    },
    async deleteTask(task) {
      await this.deleteTaskService(task.id)
      this.reloadProjects()
    }
  }
}
</script>

<style scoped>
.card-project-tasks {
  width: 400px;
  max-width: 400px;
}
.card-content {
  text-align: left;
}
</style>