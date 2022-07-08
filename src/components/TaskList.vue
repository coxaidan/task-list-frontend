<template>
  <div>
    <ul v-for="task in tasks" :key="task.id"> 
      <li class="name">{{ task.name }}</li>
      <li class="description">{{ task.description }}</li> 
      <li class="id">task.id: {{ task.id }}</li>
      <button v-if="!showEdit" @click="showEdit=true">Edit Task</button>
      <div v-if="showEdit">
        {{task.id}}
        <form form @submit="editTask(task.id, editName, editDescription)">
          <input type="text" v-model="editName" :placeholder="[task.name]" />
          <br />
          <input type="text" v-model="editDescription" :placeholder="[task.description]" />
          <br />
          <input type="Submit" value="Update"/>
        </form>  
        <form form @submit="removeTask(task.id)">
          <input type="Submit" value="Delete Task"/>
        </form> 
      </div>
    </ul>
    <br/>
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
        showEdit: false,
        // tasks: {
        //   ids: []
        //   names: [],
        //   descriptions: []
        // },
        newName: "",
        newDescription: "",
        showOptions: false
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
    }, 
    editTask(id, _name, _description) {
      let data = {
        task: {
          name: _name,
          description: _description,
          user_id: this.getUserID
        }
      }
      axios
        .put(`${BASE_URL}/tasks/${id}`, data, {
          headers: {
            "Authorization": this.getAuthToken,
          }
        })
    },
    removeTask(id) {
      axios 
        .delete(`${BASE_URL}/tasks/${id}`, {
          headers: {
            "Authorization": this.getAuthToken,
          }       
        })
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
.id {
  font-size: 12px;
}
ul{
        display:center;
        border:2px solid gray;
        padding:10px;
}
</style>