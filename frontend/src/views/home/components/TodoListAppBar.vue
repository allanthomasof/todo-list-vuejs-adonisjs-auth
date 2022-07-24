<template>
  <v-app-bar elevation="4">
    <div>
      <v-icon class="mr-2" color="blue" size="35" right>
        mdi-checkbox-marked-circle
      </v-icon>
    </div>
    <h3>Projects Todo List</h3>
    <v-spacer/>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          plain
          v-bind="attrs"
          v-on="on"
        >
          {{ username }}
          <v-icon class="mt-1" size="25" right>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item style="cursor: pointer" @click="logout()">
          <v-icon class="mr-2" color="grey" size="20" right>
            mdi-door
          </v-icon>
          Logout
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      username: JSON.parse(window.localStorage.getItem('userInfo')).name,
    }
  },

  methods: {
    ...mapActions('auth', ['logoutService']),
    async logout() {
      await this.logoutService()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
