<template>
  <v-container>
    <v-card class="home-page mx-auto" min-height="50vh" width="800px">
      <v-card-title class="text-center text-h3 mt-14 font-weight-bold"
        ><v-icon class="mb-2" size="x-small">mdi-format-list-checks</v-icon
        ><span style="color: rgb(33, 150, 243)">U</span>list</v-card-title
      >
      <v-card-subtitle class="text-center text-h6 mt-14"
        >An online to-do list app</v-card-subtitle
      >

      <router-link to="/register">
        <v-btn
          v-if="!isLoggedIn"
          class="mt-16"
          location="center"
          variant="flat"
          color="blue"
          >Get Started</v-btn
        >
      </router-link>
      <router-link to="/todolist">
        <v-btn
          v-if="isLoggedIn"
          class="mt-16"
          location="center"
          variant="flat"
          color="blue"
          >Go to my tasks</v-btn
        >
      </router-link>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  computed: {
    ...mapGetters(["getUserID", "isLoggedIn"]),
  },
};
</script>

<style scoped>
.home-page {
  background: rgba(255, 255, 255, 0.8);
}
</style>

