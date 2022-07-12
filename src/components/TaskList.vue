<template>
    <div>
        <h3 class="user-greeting">Hello, {{ getUserEmail }}</h3>
        <ul v-for="task in tasks" :key="task.id">

            <!-- TODO: Radio button to allow the user to mark a task completed -->
            <!-- <form form @submit="removeTask(task.id)"> -->
            <!-- <input class="complete-button" type="submit" value="Complete"/> -->
            <!-- </form> -->
            <a @click="editTaskForm(task)">
              <li class="list-task-name"> {{ task.name }} </li>
              <li class="list-task-description"> {{ task.description }}</li> 
            </a>
            
            <button v-if="showSidepanelForID != task.id" @click="editTaskForm(task)">Edit Task</button>
            
            <div class="sidepanel" v-if="showSidepanelForID == task.id">
                <form form @submit="editTask(task.id, editName, editDescription)">
                    <input class="form-task-name" type="text" v-model="editName" placeholder="Task name" required/>
                    <textarea class="form-task-description" type="text" rows="3" cols="20" v-model="editDescription" placeholder="Task description"></textarea>
                    <input type="Submit" value="Update Task"/>
                </form>  
                <form form @submit="removeTask(task.id)">
                    <input type="Submit" value="Delete Task"/>
                </form>
                <button @click="showSidepanelForID=false">Cancel</button>
            </div> 
        </ul>
        
        <form class="addTaskForm" @submit="addTask">
            <input class="form-task-name" type="text" v-model="newName" placeholder="Task Name" required/>
            <textarea class="form-task-description" type="text" rows="4" cols="20" v-model="newDescription" placeholder="Task Description"></textarea>
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
            // task: {
            //   names: [],
            //   descriptions: [],
            //   ids: []
            // },
            newName: "",
            newDescription: "",
            editName: "",
            editDescription: "",
            showSidepanelForID: "",
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
            this.showSidepanelForID = task.id;
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
.list-task-name {
  font-size: 24px;
  color: #1a77ce;
  font-weight: bold;
}
.list-task-description {
  font-size: 18px;
}
.user-greeting {
  position: absolute; 
  top: 15px; 
  left: 190px;
}
ul {
    display: center;
    border: 2px solid gray;
    padding: 5px;
    border-radius: 15px;
}
form {
  display: flex;
  flex-direction: column;
}
button {
  width: 10%;
  padding: 2px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
  cursor: pointer;
}
input {
  width: auto;
  padding: 3px;
  border-radius: 5px;
  margin-bottom: 5px;
}
input[type=submit] {
  padding: 1px;
  width: 10%;
  background-color: #1a77ce;
  color: #fff;
  border: none;
  cursor: pointer;
}
a {
  cursor: pointer;
}
.sidepanel {
  background-color: whitesmoke;
  border-radius: 5px;
}
.complete-button {
  border-radius: 10px;
  cursor: pointer;
  background-color: black;
}
.addTaskForm {
  position: relative;
  bottom: 10px;
}
</style>