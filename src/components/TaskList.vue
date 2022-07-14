<template>
  <v-layout @keydown.esc="drawer = false">
    <v-navigation-drawer 
      v-model="drawer" 
      class="pa-md-4 mx-lg-auto" 
      location="right"
      width="400" 
    >
      <div class="d-flex flex-row-reverse">
        <v-icon @click="drawer=null">mdi-close</v-icon>
      </div>
      <v-form
        ref="form"
        lazy-validation
        @submit="editTask(selectedTaskID, editName, editDescription)"
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
        <v-btn type=submit color="primary">Update</v-btn>
      </v-form>
      <div class="d-flex flex-row-reverse">
        <v-icon @click="removeTask(selectedTaskID)">mdi-delete</v-icon>
      </div>  
    </v-navigation-drawer>

      <v-main>
        <v-container>
          <v-card 
          class="pa-md-4 mx-lg-auto"
          tonal
          >
            <v-card-title>TASKS</v-card-title>
            <v-list 
              height="535"
              density="compact"
              overflow-y="auto"
              >
              <v-list-item 
                v-for="task in tasks" 
                :key="task.id" 
                active-color="blue"
                @click="editTaskForm(task)" 
                lines="3"
                variant="plain"
                >            
                <v-list-item-header> 
                  <v-list-item-title v-text="task.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
                  <v-divider></v-divider>
                </v-list-item-header>
              </v-list-item>   
            </v-list>
            <v-text-field
              v-model="newName"
              label="Add a Task"
              placeholder="Enter task"
              @keydown.enter="addTask"
            ></v-text-field>
          </v-card>
        </v-container>
      </v-main>
    </v-layout>
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
      newName: "",
      newDescription: "",
      editName: "",
      editDescription: "",
      selectedTaskID: null,
      drawer: false
    };
  },
  created() {
    this.getTasks()
  },
  methods: {
    getTasks() {
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
        .then(() => {
          this.getTasks()
        })
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
        .then(() => {
          this.getTasks()
        })
        .catch((error) => console.log(error));
    },
    removeTask(id) {
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };        
      axios 
        .delete(`${BASE_URL}/tasks/${id}`, config)
        .then(() => {
          this.getTasks()
        })
        .catch((error) => console.log(error));
    },
    editTaskForm(task) {
      if (this.drawer == task.id) {
        this.drawer = false
      } else {
        this.drawer = task.id
      }
      this.selectedTaskID = task.id;
      this.editName = task.name;
      this.editDescription = task.description;
    }
  },
};
</script>
