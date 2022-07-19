<template>
    <v-container>

      <!-- Sign-In -->
      <v-container v-if="showSignIn">
        <v-row>
          <v-col>
            <v-card
              class="pa-5 mx-auto" 
              width="auto"
              max-width="500px"
              min-height="350px"
              tonal
            >
              <v-card-title>Sign-In</v-card-title>
              <v-form @submit="onLogin">
                <v-text-field 
                  v-model="loginEmail" 
                  label="Email" 
                  variant="outlined"
                ></v-text-field>
                <v-text-field 
                  v-model="loginPassword" 
                  label="Password"  
                  variant="outlined"
                  type="password"
                ></v-text-field>
                <v-btn type="submit" color="primary" width="100vh">Login</v-btn>
            </v-form>
          </v-card>
      
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="text-center text-body-2">New to ToDoList?</p>
            <v-btn @click="showSignIn = false" location="center" color="normal">Create an Account</v-btn>
          </v-col>

        </v-row>
      </v-container>

   
        <!-- Sign Up -->
        <v-card 
          v-if="!showSignIn" 
          class="pa-5 mx-auto" 
          width="auto"
          max-width="500px"
          tonal
        >
          <v-card-title>Create Account</v-card-title>
          <v-form 
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field 
              v-model="signUpName" 
              label="First and last name" 
              :rules="[nameRules.required]"
              variant="outlined"
            ></v-text-field>
            <v-text-field 
              v-model="signUpEmail" 
              label="Email" 
              :rules="[emailRules.required, isValidEmail()]"
              variant="outlined"
            ></v-text-field>
            <v-text-field 
              v-model="signUpPassword" 
              type="password"
              label="Password" 
              :rules="[passwordRules.required]"
              variant="outlined"
              hint="Password must be at least 6 characters."
            ></v-text-field>
            <v-text-field 
              v-model="signUpPasswordValidation" 
              type="password"
              label="Re-enter Password"
              :rules="[passwordMatch()]"
              variant="outlined"
            ></v-text-field>
            <v-btn @click="validate" color="primary" width="100vh">Sign Up</v-btn>
          </v-form>

          <v-divider></v-divider>  
          <v-card-text>Already have an account? <a style="color: rgb(187,134,252)" @click="showSignIn = true" variant="text">Sign-In</a></v-card-text>
  
      </v-card>

    </v-container>
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
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpPasswordValidation: "",
      loginEmail: "",
      loginPassword: "",
      showSignIn: true,
      valid: true,
      nameRules: {
        required: v => !!v || "Enter your name"
      },
      emailRules: {
        required: v => !!v || "Enter your email",
      },
      passwordRules: {
        required: v => v.length >= 6 || "Password must be at least 6 characters",
      },
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
      this.signUpName = "";
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.signUpPasswordValidation = "";
      this.loginEmail = "";
      this.loginPassword = "";
    },
    validate () {
      this.$refs.form.validate()
      if (this.valid) {
        // this.onSignUp
        console.log("Valid Sign Up")
      }
    },
    isValidEmail() {
      const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return () => (emailFormat.test(String(this.signUpEmail).toLowerCase())) || "Wrong or Invalid email address. Please correct and try again.";
    },
    passwordMatch() {
      return () => (this.signUpPassword == this.signUpPasswordValidation) || "Passwords must match";
    }
  },
}
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>