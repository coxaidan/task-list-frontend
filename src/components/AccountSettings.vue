<template>
  <v-container>
    <v-card
      class="account-settings mx-auto"
      min-height="40vh"
      min-width="600px"
      max-width="800px"
      flat
    >
      <v-toolbar class="account-settings-toolbar">
        <v-toolbar-title class="text-h6">
          <v-btn
            v-if="!checkNameChange()"
            @click="exitConfirmationDialoag = true"
            class="mr-5"
            color="blue"
            icon="mdi-arrow-left"
          ></v-btn>
          <router-link v-else to="/todolist">
            <v-btn class="mr-5" color="blue" icon="mdi-arrow-left"></v-btn>
          </router-link>
          Account Settings
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation @keydown.enter="changeUserName()">
        <v-row class="mt-5" justify="center">
          <v-col cols="12" sm="6" md="8" lg="10">
            <v-text-field
              v-model="editFirstName"
              label="First Name"
              variant="outlined"
              prepend-icon="mdi-account"
              :rules="[firstNameRules.required]"
              shaped
            >
            </v-text-field>
            <v-text-field
              v-model="editLastName"
              label="Last Name"
              variant="outlined"
              prepend-icon="mdi-account"
              :rules="[lastNameRules.required]"
              shaped
            >
            </v-text-field>
            <v-text-field
              v-model="getUserEmail"
              label="Email"
              variant="outlined"
              prepend-icon="mdi-email"
              shaped
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-13"
          :disabled="!valid || checkNameChange()"
          @click="changeUserName()"
          variant="text"
          >Save</v-btn
        >
      </v-card-actions>
      <v-container>
        <v-row justify="center">
          <v-dialog v-model="exitConfirmationDialoag" persistent>
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to leave?
              </v-card-title>
              <v-card-text>All unsaved changes will be discarded.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="this.$router.push('/todolist'), (exitResponse = true)"
                >
                  Yes
                </v-btn>
                <v-btn
                  @click="
                    (exitConfirmationDialoag = false), (exitResponse = false)
                  "
                >
                  No
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

const BASE_URL = "http://localhost:3000";

export default {
  name: "AccountSettings",
  data() {
    return {
      editFirstName: null,
      editLastName: null,
      valid: true,
      firstNameRules: {
        required: (v) => !!v || "Enter your first name",
      },
      lastNameRules: {
        required: (v) => !!v || "Enter your last name",
      },
      exitConfirmationDialoag: false,
      exitResponse: null,
    };
  },
  mounted() {
    this.editFirstName = this.getUserFirstName;
    this.editLastName = this.getUserLastName;
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
  methods: {
    ...mapActions(["editUserName"]),
    changeUserName() {
      let data = {
        user: {
          first_name: this.editFirstName,
          last_name: this.editLastName,
        },
      };
      this.editUserName(data);
    },
    validate() {
      this.$refs.form.validate();
      console.log(`valid: ${this.valid}`);
    },
    checkNameChange() {
      return (
        this.editFirstName == this.getUserFirstName &&
        this.editLastName == this.getUserLastName
      );
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log(`valid: ${this.valid}, name cahnge: ${this.checkNameChange()}`);
    if (!this.valid || !this.checkNameChange()) {
      this.exitConfirmationDialoag = true;
      if (this.exitResponse) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>

<style scoped>
p {
  color: black;
}
.account-settings {
  background: rgba(255, 255, 255, 0.8);
}
.account-settings-toolbar {
  background: rgba(220, 220, 220, 0.8);
  border-radius: 5px 5px 0px 0px;
}
</style>