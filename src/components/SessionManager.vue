<template>
    <div class="container">
        <div>
            <div v-if="isLoggedIn">
                <button @click="logoutUser" class="logout-button" >Logout</button>
                <TaskList/>
            </div>
            <div v-else>
                <div v-if="!showSignIn">
                    <h3>Sign Up!</h3>
                    <form @submit="onSignUp" class="sign-up-form">
                        <input class="sign-up-form-email" type="email" v-model="signUpEmail" placeholder="Email" />
                        <br/>
                        <input class="sign-up-form-password" type="password" v-model="signUpPassword" placeholder="Password"/>
                        <br/>
                        <input type="submit" value="Sign up" class="sign-up-form-submit" />
                        <br/>
                        <p>Already a user? <a @click="showSignIn = true">Login.</a></p>
                    </form>
              </div>
              <div v-if="showSignIn">
                  <h3>Login!</h3>
                  <form @submit="onLogin" class="login-form">
                      <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
                      <br />
                      <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password" />
                      <br />
                      <input type="submit" value="Login" class="login-form-submit" />
                      <br/> 
                      <p>Not a user? <a @click="showSignIn = False">Create an Account.</a></p>
                  </form>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
import TaskList from "./TaskList.vue";
export default {
    name: "SessionManager",
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
    components: { TaskList }
}
</script>

<style scoped>
a {
  color: blue;
  cursor: pointer;
}

a:hover {
  color: rgb(0, 0, 225);
}
.container {
  width: 90%;
  margin: 0 auto;
}
.sign-up-form {
  width: 100%;
}
.sign-up-form-email {
  width: 35%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-password {
  width: 35%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.sign-up-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}

.login-form {
  width: 100%;
}
.login-form-email {
  width: 35%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-password {
  width: 35%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.login-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.logout-button {
  width: 10%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
  position:absolute; top:0; right:0;
}
.logout-button:hover {
  background-color: #0d5c8a;
  cursor: pointer;
} 
</style>