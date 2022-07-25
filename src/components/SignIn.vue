<template>
  <v-container>
    <v-card class="pa-5 mx-auto" max-width="500px" height="350px" tonal>
      <v-card-title>Sign-In</v-card-title>
      <v-form
        ref="signInForm"
        v-model="validSignIn"
        lazy-validation
        @keydown.enter="validateSignIn()"
      >
        <v-text-field
          v-model="loginEmail"
          prepend-inner-icon="mdi-email"
          label="Email"
          :rules="[emailRules.required]"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="loginPassword"
          prepend-inner-icon="mdi-lock"
          label="Password"
          variant="outlined"
          :rules="[passwordRules.required]"
          type="password"
        ></v-text-field>
        <v-alert
          class="mb-n3 mt-n7"
          v-if="incorrectLogin"
          type="error"
          icon="mdi-alert-circle"
          >Email or Password is Incorrect.</v-alert
        >
        <br />
        <v-btn
          class="mb-n3"
          @click="validateSignIn()"
          color="primary"
          width="490px"
          >Login</v-btn
        >
      </v-form>
    </v-card>

    <v-row class="mt-6">
      <v-col>
        <p class="text-center text-body-2">New to Ulist?</p>
        <router-link to="/register">
          <v-btn location="center">Create an Account</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      validSignIn: true,
      incorrectLogin: false,
      emailRules: {
        required: (v) => !!v || "Enter your email",
      },
      passwordRules: {
        required: (v) => !!v || "Enter your password",
      },
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["loginUser"]),
    onLogin(event) {
      // event.preventDefault();
      let data = {
        user: {
          email: this.loginEmail,
          password: this.loginPassword,
        },
      };
      this.loginUser(data);
      // this.resetData();
    },
    resetData() {
      this.loginEmail = "";
      this.loginPassword = "";
    },
    validateSignIn() {
      this.$refs.signInForm.validate();

      console.log(`validSignIn: ${this.validSignIn}`);
      console.log(`loginEmail: ${this.loginEmail}`);
      console.log(`loginPassword: ${this.loginPassword}`);
      
      if (this.validSignIn) {
        this.onLogin();
        console.log("Logged In: " + this.isLoggedIn);
        if (this.isLoggedIn) {
          this.$router.push("/todolist");
          this.resetData();
        } else {
          this.incorrectLogin = true;
        }
      }
    },
  },
};
</script>

<style>
p {
  color: white;
}
</style>
