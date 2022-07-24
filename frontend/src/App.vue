<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;900&display=swap');

* {
  font-size: 14px;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}

h1 {
  font-size: 28px;
}
h2 {
  font-size: 22px;
}
h3 {
  font-size: 18px;
}
h4 {
  font-size: 16px;
}
h5 {
  font-size: 14px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app-checkbox .v-label {
  font-size: 14px !important;
  text-transform: capitalize;
}
.app-checkbox {
  height: 25px;
}
</style>
