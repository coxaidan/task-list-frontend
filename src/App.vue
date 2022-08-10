<template>
  <v-app :class="`app-background app-background-${getUserBackground}`">
    <v-app-bar class="task-list-app-bar" elevation="1" app>
      <v-app-bar-title class="text-h3 font-weight-bold">
        <router-link :to="!isLoggedIn ? '/' : '/todolist'">
          <v-icon class="mb-2" size="x-small">mdi-format-list-checks</v-icon
          ><span style="color: rgb(33, 150, 243)">U</span>list</router-link
        >
      </v-app-bar-title>
      <v-app-bar-title v-if="isLoggedIn" class="greeting text-h6"
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
            <router-link to="/preferences">
              <v-btn>Prefernces</v-btn>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    greeting: "",
  }),
  created() {
    this.currentTime();
  },
  computed: {
    ...mapGetters([
      "getAuthToken",
      "getUserEmail",
      "getUserID",
      "isLoggedIn",
      "getUserFirstName",
      "getUserBackground",
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
.app-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("./assets/mountain.jpg") no-repeat center center;
  background-size: cover !important;
  background-color: black;
}
.app-background-1 {
  background: url("./assets/mountain.jpg") no-repeat center center;
}

.app-background-2 {
  background: url("./assets/grand_canyon.jpg") no-repeat center center;
}

.app-background-3 {
  background: url("./assets/new_york.jpg") no-repeat center center;
}

.app-background-4 {
  background: url("./assets/paris.jpg") no-repeat center center;
}

.app-background-5 {
  background: url("./assets/beach.jpg") no-repeat center center;
}

.app-background-6 {
  background: url("./assets/london.jpg") no-repeat center center;
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
