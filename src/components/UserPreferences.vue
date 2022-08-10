<template>
  <v-container>
    <v-card
      class="theme mx-auto"
      min-height="60vh"
      min-width="600px"
      max-width="800px"
      flat
    >
      <v-toolbar class="theme-toolbar mb-5">
        <v-toolbar-title class="text-h6">
          <router-link to="/todolist">
            <v-btn class="mr-5" color="blue" icon="mdi-arrow-left"></v-btn>
          </router-link>
          Theme
        </v-toolbar-title>
      </v-toolbar>
      <v-row justify="center" class="mx-auto mb-2">
        <v-col>
          <v-img
            :class="theme == 1 ? 'selected-img theme-img' : 'theme-img'"
            src="../assets/mountain.jpg"
            aspect-ratio="1.25"
            cover
            @click="changeBackground(1)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col>
          <v-img
            :class="theme == 2 ? 'selected-img theme-img' : 'theme-img'"
            src="../assets/grand_canyon.jpg"
            aspect-ratio="1.25"
            cover
            @click="changeBackground(2)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col>
          <v-img
            :class="theme == 3 ? 'selected-img theme-img' : 'theme-img'"
            src="../assets/new_york.jpg"
            aspect-ratio="1.25"
            cover
            @click="changeBackground(3)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
      <v-row justify="center" class="mx-auto mb-2">
        <v-col>
          <v-img
            :class="theme == 4 ? 'selected-img theme-img' : 'theme-img'"
            src="../assets/paris.jpg"
            aspect-ratio="1.25"
            cover
            @click="changeBackground(4)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col>
          <v-img
            :class="theme == 5 ? 'selected-img theme-img' : 'theme-img'"
            src="../assets/beach.jpg"
            aspect-ratio="1.25"
            cover
            @click="changeBackground(5)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col>
          <v-img
            :class="theme == 6 ? 'selected-img theme-img' : 'theme-img'"
            src="../assets/london.jpg"
            aspect-ratio="1.25"
            cover
            @click="changeBackground(6)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserPreferences",
  computed: {
    ...mapGetters(["getUserBackground"]),
  },
  data() {
    return {
      theme: null,
    };
  },
  mounted() {
    this.theme = this.getUserBackground;
  },
  methods: {
    ...mapActions(["editUserBackground"]),
    changeBackground(ID) {
      this.theme = ID;
      const data = {
        user: {
          background: this.theme,
        },
      };
      this.editUserBackground(data);
    },
  },
};
</script>

<style scoped>
.theme-toolbar {
  background: rgba(220, 220, 220, 0.8);
  border-radius: 5px 5px 0px 0px;
}
.theme {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
}
.theme-img {
  cursor: pointer !important;
}
.selected-img {
  border: 5px solid rgb(33, 150, 243) !important;
}
</style>