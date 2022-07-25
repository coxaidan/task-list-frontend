<template>
  <v-app> 

    <span class="background"></span>
    <v-app-bar elevation="1" app>
      <v-app-bar-title v-if="!isLoggedIn" class="text-h3 font-weight-bold">
        <router-link to="/">Ulist</router-link>
      </v-app-bar-title>
      <v-app-bar-title v-else class="text-h3 font-weight-bold">
        <router-link to="/todolist">Ulist</router-link>
      </v-app-bar-title>
      <router-link 
        v-if="this.$route.path == '/' && !isLoggedIn" 
        to="/login"
      >
        <v-btn>Login</v-btn>
      </router-link>
      <router-link 
        v-if="this.$route.path == '/' && !isLoggedIn" 
        to="/register"
      >
        <v-btn variant="flat" color="blue">Get Started</v-btn>
      </router-link>
      <v-menu 
        v-if="isLoggedIn" 
        location="bottom" 
        color="dark"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-menu"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <router-link to="/account">
              <v-btn>Account</v-btn>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/">
              <v-btn @click="logoutUser">Logout</v-btn>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
// import { useTheme } from 'vuetify' 
import { mapActions, mapGetters } from "vuex";

import TaskList from "./components/TaskList.vue";

export default {
  name: 'App',
  components: { TaskList },
  data: () => ({
    //
  }),
  // setup () {
  //   const theme = useTheme()
  //   return {
  //     theme,
  //     toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  //   }
  // },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
  },
}
</script>

<style>
.background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("./assets/2560x1440-blue-abstract-noise-free-website-background-image.jpg") no-repeat center center;
    background-size: cover;
    background-color: white;
    transform: scale(1.1);
  }

a {
    text-decoration: none;
    color: black;
}
</style>
