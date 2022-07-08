<template>
    <div>
        <h3 class="greeting">Hello, {{ getUserEmail.split("@")[0] }}</h3>
        <ul v-for="task in tasks" :key="task.id">
            <li class="name">{{ task.name }}</li>
            <li class="description">{{ task.description }}</li> 
            <button v-if="showOptions != task.id" @click="editTaskForm(task)">Edit Task</button>
            <div v-if="showOptions == task.id">
                  <form form @submit="editTask(task.id, editName, editDescription)">
                    <input type="text" v-model="editName" placeholder="Name"/>
                    <br />
                    <input type="textarea" v-model="editDescription" placeholder="Description" />
                    <br />
                    <input type="Submit" value="Update Task"/>
                </form>  
                <form form @submit="removeTask(task.id)">
                    <input type="Submit" value="Delete Task"/>
                </form>
                <br />
                <button @click="showOptions=false">Cancel</button>
          </div> 
        </ul>
        <br/>
        <form @submit="addTask">
            <input type="text" v-model="newName" placeholder="Name" />
            <br />
            <input type="textarea" v-model="newDescription" placeholder="Description" />
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
        newName: "",
        newDescription: "",
        editName: "",
        editDescription: "",
        showOptions: "",
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
    },
    editTaskForm(task) {
      this.showOptions = task.id;
      this.editName = task.name;
      this.editDescription = task.description;
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
  color: #1a77ce;
  font-weight: bold;
}
.description {
  font-size: 18px;
}
.id {
  font-size: 12px;
}
.greeting {
  position: absolute; top:0; left:5px;
}
ul {
    display: center;
    border: 2px solid gray;
    padding: 5px;
    border-radius: 15px;
}
button {
  width: 10%;
  padding: 1px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
input[type=submit] {
  width: 10%;
  padding: 1px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
input {
  padding: 1px;
  border-radius: 5px;
  margin: 0 auto;
}
</style>