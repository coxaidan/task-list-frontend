<template>
  <div>
    <h1>Tasks</h1>
    <ul v-for="task in tasks" :key="task.id">
      <li class="name">{{ task.name }}</li>
      <li class="description">{{ task.description }}</li>
      <li class="userID">user_id: {{ task.user_id }}</li>
      <li>current user id: {{ this.getUserID }}</li>
    </ul>
    <form @submit="addTask">
        <input type="text" v-model="newName" placeholder="Name" />
        <br />
        <input type="text" v-model="newDescription" placeholder="Description" />
        <br />
        <input type="Submit" value="Add Task"/>
        </form>
  </div>
</template>

<script>
import axios from "axios";
import "@/store/index.js";
import SessionManger from "./SessionManager.vue";
import { mapGetters } from "vuex";

const BASE_URL = "http://localhost:3000";

export default {
  name: "TaskList",
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  data() {
    return {
        tasks: null,
        newName: "",
        newDescription: ""
    };
  },
  created() {
    axios
      .get(`${BASE_URL}/tasks`, {
        headers: {
          "Authorization": this.getAuthToken,
        },
      })
      .then((response) => (this.tasks = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    addTask() {
        let data = {
            task: {
                name: this.newName,
                description: this.newDescription,
                user_id: this.getUserID
            }
        }
        axios
            .post(`${BASE_URL}/tasks`, data, {
                headers: {
                    "Authorization": this.getAuthToken,
                }       
            })
            .catch((error) => console.log(error));
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
.name {
  font-size: 24px;
  color: blue;
  font-weight: bold;
}
.description {
  font-size: 18px;
}
</style>