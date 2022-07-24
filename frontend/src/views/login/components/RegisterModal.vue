<template>
  <v-card>
    <v-card-title>
      Create new user
    </v-card-title>
    <v-card-text>
      <v-text-field
        hide-details
        class="mt-4"
        label="Name"
        style="background-color: white"
        v-model="newUser.name"
        outlined
        dense
      >
      </v-text-field>
      <v-text-field
        hide-details
        class="mt-2 mb-2"
        label="Email"
        style="background-color: white"
        v-model="newUser.email"
        outlined
        dense
      >
      </v-text-field>
      <v-text-field
        hide-details
        class="mt-2 mb-2"
        placeholder="Password"
        label="Password"
        style="background-color: white"
        v-model="newUser.password"
        type="password"
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
        @click="register()"
        color="green darken-1"
        text
      >
        register
      </v-btn>
    </v-card-actions>
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
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'closeDialog',
    'callbackRegister'
  ],
  data: () => {
    return {
      newUser: {
        name: '',
        email: '',
        password: '',
      },
      snackbar: false,
      loading: false,
      snackbarText: '',
    }
  },
  methods: {
    ...mapActions('auth', ['registerService']),
    async register() {
      this.loading = true;
      if (this.newUser.name.length && this.newUser.email.length && this.newUser.password.length) {
        try {
          await this.registerService(this.newUser)
          this.callbackRegister('User registered with success!', this.newUser);
          this.newUser = {name: '', email: '', password: ''}
          this.closeDialog()
        } catch (errorMessage) {
          this.snackbar = true;
          this.snackbarText = errorMessage;
        }
      } else {
        this.snackbar = true;
        this.snackbarText = 'Please enter the data in the form';
      }
      this.loading = false;
    }
  }
}
</script>

<style>
</style>
