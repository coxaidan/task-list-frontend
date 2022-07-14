<template>
  <v-layout>
    <v-container>
        <v-main v-if="!isLoggedIn">

          <v-card 
            v-if="!showSignIn" 
            class="pa-md-4 mx-lg-auto" 
            width="auto"
            max-width="800"
            height="400"
            tonal
          >
            <v-card-title>Create Account</v-card-title>
            <v-form @submit="onSignUp">
              <v-text-field 
                v-model="signUpEmail" 
                label="Email" 
                required
              ></v-text-field>
              <v-text-field 
                v-model="signUpPassword" 
                label="Password" 
                required 
                type="password"
              ></v-text-field>
              
              <v-card-actions>
                <v-btn type="submit" color="primary">Sign Up</v-btn>
              </v-card-actions>
            </v-form>
            <v-card-text>Already have an account? <a style="color: rgb(187,134,252)"  @click="showSignIn = true" variant="text">Sign-In.</a></v-card-text>
          </v-card>

          <v-card 
            v-if="showSignIn"
            class="pa-md-4 mx-lg-auto" 
            width="auto"
            max-width="800"
            height="400"
            tonal
          >
            <v-card-title>Sign-In</v-card-title>
            <v-form @submit="onLogin">
                <v-text-field 
                  v-model="loginEmail" 
                  label="Email" 
                  required
                ></v-text-field>
                <v-text-field 
                  v-model="loginPassword" 
                  label="Password" 
                  required 
                  type="password"
                ></v-text-field>
                <v-card-actions>
                  <v-btn type="submit" color="primary">Login</v-btn>
                </v-card-actions>
            </v-form>
            <v-card-text>Not registered? <a style="color: rgb(187,134,252)" @click="showSignIn = false" variant="text">Create an Account.</a></v-card-text>
          </v-card>

        </v-main>
    </v-container>
  </v-layout>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
import TaskList from "./TaskList.vue";
export default {
  name: "SessionManager",
  components: { TaskList },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  data() {
    return {
      signUpEmail: "",
      signUpPassword: "",
      loginEmail: "",
      loginPassword: "",
      showSignIn: true
    };
  },
  methods: {
    ...mapActions(["registerUser", "loginUser", "logoutUser"]),
    onSignUp(event) {
      event.preventDefault();
      let data = {
        user: {
         email: this.signUpEmail,
         password: this.signUpPassword,
        },
      };
      this.registerUser(data);
      this.resetData();
    },
    onLogin(event) {
      event.preventDefault();
      let data = {
        user: {
          email: this.loginEmail,
          password: this.loginPassword,
        },
      };
      this.loginUser(data);
      this.resetData();
    },
    resetData() {
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.loginEmail = "";
      this.loginPassword = "";
    },
  },
}
</script>
