<template>
  <v-app> 

    <v-app-bar elevation="1" app>
      <v-app-bar-title class="text-h3 font-weight-bold">ToDoList</v-app-bar-title>
      <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon>
      <v-menu v-if="isLoggedIn" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            dark
            v-bind="props"
            icon="mdi-dots-vertical"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn color="primary">Account</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn @click="logoutUser" color="primary">Logout</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <SessionManager v-if="!isLoggedIn"/>
        <TaskList v-else/>
 
        <!-- <router-view></router-view> -->
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import SessionManager from './components/SessionManager.vue'
import TaskList from './components/TaskList.vue'
import { useTheme } from 'vuetify'
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',

  components: {
    SessionManager,
    TaskList
  },  

  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },

  methods: {
    ...mapActions(["registerUser", "loginUser", "logoutUser"]),
  },

  data: () => ({
    drawer: null,
  }),
  setup () {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  }
}
</script>