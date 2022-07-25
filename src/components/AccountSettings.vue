<template>
  <v-container>
    <v-card
      class="pa-4 mx-auto"
      max-height="84vh"
      tonal
      min-width="600px"
      max-width="800px"
    >
      <v-toolbar color="dark">
        <v-toolbar-title>
        <router-link to="/todolist">
          <v-btn
            class="mr-5"
            color="blue"
            icon="mdi-arrow-left"
          ></v-btn>
        </router-link>

          Account Settings
        </v-toolbar-title>
        <!-- TODO: <v-btn variant="text" icon="mdi-sort"></v-btn> -->
      </v-toolbar>

      <v-list>
        <v-list-item-title>My Profile</v-list-item-title>
        <v-list-item>First Name: </v-list-item>
        <v-list-item>last Name: </v-list-item>
        <v-list-item>Email: {{ getUserEmail }}</v-list-item>
        <v-list-item>UserID: {{ getUserID }}</v-list-item>
        <v-list-item>Auth Token: {{ getAuthToken }}</v-list-item>
        <v-list-item>isLoggedIn: {{ isLoggedIn }}</v-list-item>
      </v-list>

      <v-list>
        <!-- <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon> -->
        <v-list-item-subtitle>Theme</v-list-item-subtitle>
        <v-list-item>
          <v-btn 
            variant="text" 
            :icon="!darkMode ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'"
            @click="darkMode = false"
        ></v-btn>
          <v-list-item-title>Light Theme</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-btn 
            variant="text" 
           :icon="darkMode ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'"
           @click="darkMode = true"
          ></v-btn>
          <v-list-item-title>Dark Theme</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- TODO -->
        <v-btn>Delete Account</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import "@/store/index.js";
import { mapGetters } from "vuex";

export default {
  name: "AccountSettings",
  data() {
    return {
       darkMode: false
    }
  },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  data() {
    return {};
  },
};
</script>