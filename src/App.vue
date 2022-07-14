<template>
  <v-app >
      <v-app-bar elevation="10" app>
        <v-app-bar-title>To-do List</v-app-bar-title>
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
              <v-btn @click="logoutUser">Logout</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <div v-if="!isLoggedIn">
          <SessionManager/>
        </div>
        <div v-else>
          <TaskList/>
        </div>
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