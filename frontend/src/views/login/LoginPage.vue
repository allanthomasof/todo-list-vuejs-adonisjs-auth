<template>
  <v-main class="d-flex align-center justify-center">
    <v-row class="align-center justify-center pl-8">
      <div style="font-size: 28px">
        Projects <strong style="font-size: 28px">Todo List</strong>
      </div>
      <v-icon class="mr-2" color="blue" size="30" right>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-row>
    <v-card class="card-login pa-4 mt-12">
      <div
        class="px-4 my-4"
        style="width: 100%;"
        no-gutters
      >
        <h2>Login</h2>
        <v-text-field
          hide-details
          class="mt-4 mb-2"
          label="Email"
          style="background-color: white"
          v-model="email"
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
          v-model="password"
          type="password"
          outlined
          dense
          v-on:keyup.enter="login()"
        >
        </v-text-field>
        <v-btn
          @click="login()"
          color="success"
          width="90"
          elevation="0"
          height="41"
          block
        >
          Enter
        </v-btn>
        <br>
        <a @click="showRegisterModal = true">Register account</a>
      </div>
    </v-card>
    <v-dialog v-model="showRegisterModal" width="500px">
      <RegisterModal
        :closeDialog="() => showRegisterModal = false"
        :callbackRegister="(text, newUser) => callbackRegister(text, newUser)"
      ></RegisterModal>      
    </v-dialog>
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
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RegisterModal from './components/RegisterModal.vue'

export default {
  components: { RegisterModal },
  data: () => ({
    email: '',
    password: '',
    loading: false,
    showRegisterModal: false,
    snackbar: false,
    snackbarText: '',
  }),
  computed: {
    ...mapState({
      isLogged: state => state.auth.isLogged
    })
  },
  mounted() {
    if (this.isLogged) {
      this.$router.push("/")
    }
  },
  methods: {
    ...mapActions('auth', ['loginService']),
    async login() {
      this.loading = true;
      try {
        await this.loginService({ email: this.email, password: this.password })
        this.$router.push('/')
      }
      catch (errorMessage) {
        this.snackbar = true
        this.snackbarText = errorMessage
      }
      this.loading = false
    },
    callbackRegister(text, newUser) {
      this.snackbar = true
      this.snackbarText = text
      this.email = newUser.email
      this.password = newUser.password
      this.login()
    }
  },
}
</script>

<style scoped>
.card-login {
  width: 400px;
  background-color: #eeeeee;
  margin: 0 auto;
}

</style>