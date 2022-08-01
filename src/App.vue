<template>
  <v-app>
    <span class="background"></span>
    <v-app-bar class="task-list-app-bar" elevation="1" app>
      <v-app-bar-title class="text-h3 font-weight-bold">
        <router-link :to="!isLoggedIn ? '/' : '/todolist'">Ulist</router-link>
      </v-app-bar-title>
      <v-app-bar-title v-if="isLoggedIn" class="greeting"
        >{{ greeting }}, {{ getUserFirstName }}</v-app-bar-title
      >
      <router-link v-if="this.$route.path == '/' && !isLoggedIn" to="/login">
        <v-btn>Login</v-btn>
      </router-link>
      <v-menu v-if="isLoggedIn" location="bottom" color="dark">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-menu"></v-btn>
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

export default {
  name: "App",
  data: () => ({
    greeting: "",
  }),
  created() {
    this.currentTime();
  },
  // setup() {
  //   const theme = useTheme()
  //   return {
  //     theme,
  //     toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  //   }
  // },
  computed: {
    ...mapGetters([
      "getAuthToken",
      "getUserEmail",
      "getUserID",
      "isLoggedIn",
      "getUserFirstName",
    ]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
    currentTime() {
      var today = new Date();
      var currentHour = today.getHours();

      if (currentHour < 12) {
        this.greeting = "Good morning";
      } else if (currentHour < 18) {
        this.greeting = "Good afternoon";
      } else {
        this.greeting = "Good evening";
      }
    },
  },
};
</script>

<style>
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("./assets/mountain.jpg") no-repeat center center;
  background-size: cover;
  background-color: white;
}

.task-list-app-bar {
  background-color: rgba(255, 255, 255, 0.8) !important;
}
a {
  text-decoration: none;
  color: black;
}
.greeting {
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}
html { 
  overflow-y: auto !important; 
}
</style>
