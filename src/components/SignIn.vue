<template>
  <v-container>
    <v-card class="sign-in pa-5 mx-auto" max-width="500px" height="350px" tonal>
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
          class="mt-n2"
          v-model="loginPassword"
          prepend-inner-icon="mdi-lock"
          label="Password"
          variant="outlined"
          :rules="[passwordRules.required]"
          type="password"
        ></v-text-field>
        <v-alert
          class="mb-n9 mt-n3"
          v-if="incorrectLogin"
          type="error"
          icon="mdi-alert-circle"
          >Email or Password is Incorrect.</v-alert
        >
        <br />
        <v-btn
          class="mb-n9 mt-3"
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
import store from "@/store/index.js";
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
    ...mapGetters(["isLoggedIn", "getAuthToken"]),
  },
  methods: {
    ...mapActions(["loginUser"]),
    async onLogin() {
      let data = {
        user: {
          email: this.loginEmail,
          password: this.loginPassword,
        },
      };

      let response = await this.loginUser(data);
      if (response != 401) {
        this.$router.push("/todolist");
        this.resetData();
      } else {
        this.incorrectLogin = true;
      }
    },
    resetData() {
      this.loginEmail = "";
      this.loginPassword = "";
    },
    validateSignIn() {
      this.$refs.signInForm.validate();

      if (this.validSignIn) {
        this.onLogin();
      }
    },
  },
};
</script>

<style scoped>
p {
  color: white;
}
.sign-in {
  background: rgba(255, 255, 255, 0.8);
}
</style>
