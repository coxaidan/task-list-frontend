<template>
  <v-container>
    <v-card class="sign-up pa-5 mx-auto" width="auto" max-width="500px" tonal>
      <v-card-title>Create Account</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="signUpFirstName"
          label="First name"
          :rules="[firstNameRules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="signUpLastName"
          label="Last name"
          :rules="[lastNameRules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="signUpEmail"
          label="Email"
          :rules="[emailRules.required, isValidEmail()]"
          variant="outlined"
          prepend-inner-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="signUpPassword"
          type="password"
          label="Password"
          :rules="[passwordRules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          hint="Password must be at least 6 characters."
        ></v-text-field>
        <v-text-field
          v-model="signUpPasswordValidation"
          type="password"
          label="Re-enter Password"
          :rules="[passwordMatch()]"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-btn @click="validate" color="primary" width="100vh">Sign Up</v-btn>
      </v-form>

      <v-divider></v-divider>
      <v-card-text
        >Already have an account?
        <router-link to="/login">Sign-In</router-link>
      </v-card-text>
    </v-card>
    <!-- <router-link v-if=""></router-link> -->
  </v-container>
</template>

<script>
import "@/store/index.js";
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      signUpFirstName: "",
      signUpFirstName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpPasswordValidation: "",
      valid: true,
      firstNameRules: {
        required: (v) => !!v || "Enter your first name",
      },
      lastNameRules: {
        required: (v) => !!v || "Enter your last name",
      },
      emailRules: {
        required: (v) => !!v || "Enter your email",
      },
      passwordRules: {
        required: (v) =>
          v.length >= 6 || "Password must be at least 6 characters",
      },
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    onSignUp(event) {
      event.preventDefault();
      let data = {
        user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
        },
      };
      this.registerUser(data);
      this.$router.push("/todolist");
      this.resetData();
    },
    resetData() {
      this.signUpFirstName = "";
      this.signUpLastName = "";
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.signUpPasswordValidation = "";
    },
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        // this.onSignUp
        alert("Successfuly registered");
      }
    },
    isValidEmail() {
      const emailFormat =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return () =>
        emailFormat.test(String(this.signUpEmail).toLowerCase()) ||
        "Wrong or Invalid email address. Please correct and try again.";
    },
    passwordMatch() {
      return () =>
        this.signUpPassword == this.signUpPasswordValidation ||
        "Passwords must match";
    },
  },
};
</script>

<style scoped>
.sign-up {
  background: rgba(255, 255, 255, 0.8);
}
</style>

