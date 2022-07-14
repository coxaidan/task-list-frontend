<template>
  <v-container>

    <!-- <h3 class="user-greeting">Hello, {{ getUserEmail }}</h3> -->

    <!-- <div class="task-list">
      <ul v-for="task in tasks" :key="task.id">
        <div class="task-item" @click="editTaskForm(task)">
          <v-btn elevation="3" icon @click="removeTask(task.id)" type="checkbox"></v-btn>
          <div class="fill-height"> 
            <li class="list-task-name"> {{ task.name }} </li>
            <li class="list-task-description" > {{ task.description }}</li> 
          </div> 
        </div>
      </ul>
    </div>
  <form class="add-task-form" @submit="addTask">
    <input class="form-task-name" type="text" v-model="newName" placeholder="Task Name" required/>
    <textarea class="form-task-description" type="text" rows="4" cols="20" v-model="newDescription" placeholder="Task Description"></textarea>
    <input type="Submit" value="Add Task"/>
  </form> -->

  <!-- <div class="sidepanel-wrap" v-if="sidebarTaskID != null">
    <div class="sidepanel">
      <form form @submit="editTask(sidebarTaskID, editName, editDescription)">
        <input class="form-task-name" type="text" v-model="editName" placeholder="Task name" required/>
        <textarea class="form-task-description" type="text" rows="3" cols="20" v-model="editDescription" placeholder="Task description"></textarea>
        <input type="Submit" value="Update Task"/>
      </form>  
      <form form @submit="removeTask(sidebarTaskID)">
        <input type="Submit" value="Delete Task"/>
      </form>
      <button @click="sidebarTaskID=null">Cancel</button>
    </div> 
    </div> -->
    
    <v-card>
      <v-layout>
        <v-navigation-drawer v-model="drawer" temporary location="right">
          <v-form
            ref="form"
            lazy-validation
            @input="editTask(sidebarTaskID, editName, editDescription)"
          >
            <v-text-field
              v-model="editName"
              label="Name"
              required
            ></v-text-field>

            <v-textarea
              v-model="editDescription"
              label="Description"
            ></v-textarea>
          </v-form>

          <v-btn @click="removeTask(sidebarTaskID)">Delete</v-btn>

          <v-btn @click="drawer=null">Cancel</v-btn>

        </v-navigation-drawer>
        <v-main style="height: auto">
          <v-card class="mx-auto" max-width="auto">
            <v-list density="compact">
              <v-list-subheader>TASKS</v-list-subheader>
              <v-list-item v-for="task in tasks" :key="task.id" active-color="primary" @click.stop="drawer = !drawer" @click="editTaskForm(task)" lines="2">
                <v-list-item-header>
                  <v-list-item-title v-text="task.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
                </v-list-item-header>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-text-field
                  v-model="newName"
                  label="Add a Task"
                  placeholder="Enter task"
                  @keyup.enter="addTask"
                ></v-text-field>
              </v-list-item>
            </v-list>
          </v-card>
        </v-main>
      </v-layout>
    </v-card>
  </v-container>
  
</template>

<script>
import axios from "axios";
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
      sidebarTaskID: null,
      drawer: null
    };
  },
  created() {
    const config = {
      headers: {
        authorization: this.getAuthToken,
      },
    };
    axios
      .get(`${BASE_URL}/tasks`, config)
      .then((response) => (this.tasks = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    addTask() {
      const data = {
        task: {
          name: this.newName,
          description: this.newDescription,
          user_id: this.getUserID
        }
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .post(`${BASE_URL}/tasks`, data, config)
        .catch((error) => console.log(error));
    }, 
    editTask(id, _name, _description) {
      const data = {
        task: {
          name: _name,
          description: _description,
          user_id: this.getUserID
        }
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${id}`, data, config)
    },
    removeTask(id) {
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };        
      axios 
        .delete(`${BASE_URL}/tasks/${id}`, config)
    },
    editTaskForm(task) {
      console.log(task.id)
      this.sidebarTaskID = task.id;
      this.editName = task.name;
      this.editDescription = task.description;
    }
  },
};
</script>

<style scoped>
/* li {
    list-style: none;
}
ul:hover {
  background-color: lightblue;
}
ul {
    border: 2px solid gray;
    padding: 5px;
    border-radius: 15px;
}
form {
  display: flex;
  flex-direction: column;
} */
/* button {
  width: 10%;
  padding: 2px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
  cursor: pointer;
} */
/* input {
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
.list-task-name {
  font-size: 20px;
  color: #1a77ce;
  font-weight: bold;
  overflow-wrap: break-word;
}
.list-task-description {
  font-size: 14px;
  overflow-wrap: break-word;
}
.user-greeting {
  position: absolute; 
  top: 15px; 
  left: 190px;
} */
/* .sidepanel-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 30em; */
  /* transform: translateX(100%); */
  /* transition: .3s ease-out;
}
.sidepanel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333;
  color: #eee;
  overflow: auto;
  padding: 1em;
}
.complete-button {
  border-radius: 10px;
  cursor: pointer;
  background-color: black;
} */
/* .add-task-form {
  position: fixed;
  bottom: 0;
  width: 50em;
  border: 2px solid gray;
  padding: 5px;
  border-radius: 15px;
} */
/* .task-list {
  margin: 4px, 4px;
  padding: 4px;
  width: 100%;
  height: 33em;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify; */
  /* border:1px solid green;   */
/* }
.complete-task-button {
  position: flex;
  left: auto;
  background-color: blue ;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
}
.task-item {
  display: inline-block;
  vertical-align: top;
} */
</style>