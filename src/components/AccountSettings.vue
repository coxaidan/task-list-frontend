<template>
  <v-container>
    <v-card
      class="pa-2 mx-auto"
      min-height="50vh"
      tonal
      min-width="600px"
      max-width="800px"
    >
      <v-toolbar color="dark">
        <v-toolbar-title class="text-h6">
          <router-link to="/todolist">
            <v-btn class="mr-5" color="blue" icon="mdi-arrow-left"></v-btn>
          </router-link>
          Account Settings
        </v-toolbar-title>
      </v-toolbar>

      <v-list class="mx-6">
        <v-list-item-title class="text-subtitle-2"
          >My Profile</v-list-item-title
        >
        <v-list-item>First name: {{ getUserFirstName }}</v-list-item>
        <v-list-item>Last name: {{ getUserLastName }}</v-list-item>
        <v-list-item>email: {{ getUserEmail }}</v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list class="mx-6">
        <!-- <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon> -->
        <v-list-item-title class="text-subtitle-2">Theme</v-list-item-title>
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
      darkMode: false,
    };
  },
  computed: {
    ...mapGetters([
      "getAuthToken",
      "getUserEmail",
      "getUserID",
      "isLoggedIn",
      "getUserFirstName",
      "getUserLastName",
    ]),
  },
};
</script>

<style scoped>
p {
  color: black;
}
</style>