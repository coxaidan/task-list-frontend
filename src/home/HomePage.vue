<template>
    <v-container>
        <v-card 
            class="mx-auto"
            min-height="50vh"
            width="800px"
        >
          <v-card-title class="text-center text-h3 mt-14">A online to-do list app</v-card-title>

          <router-link to="/register">
            <v-btn v-if="!isLoggedIn" class="mt-16" location="center" variant="flat" color="blue">Get Started</v-btn>
          </router-link>
          <router-link to="/todolist">
            <v-btn v-if="isLoggedIn" class="mt-16" location="center" variant="flat" color="blue">Go to my tasks</v-btn>
          </router-link>

        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'HomePage',
    computed: {
    ...mapGetters(["getUserID", "isLoggedIn"]),
  },
}

</script>

