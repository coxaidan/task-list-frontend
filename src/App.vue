<template>
  <v-app>
    <v-app-bar elevation="4" app>
      <v-toolbar-title>To-do List</v-toolbar-title>
      <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon>

      <v-btn v-if="isLoggedIn" variant="text" icon="mdi-dots-vertical" @click.stop="drawer = !drawer"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        bottom
        temporary
        location="right"
        >
      <v-btn @click="logoutUser">Logout</v-btn>
    </v-navigation-drawer>
    
    
    <v-main>
      <v-container>
        <!-- <HelloWorld/> -->
        <SessionManager/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SessionManager from './components/SessionManager.vue'
import TaskList from './components/TaskList.vue'
import { useTheme } from 'vuetify'
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',

  components: {
    HelloWorld,
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