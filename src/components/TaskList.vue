<template>
  <v-container>

    <v-card
      class="pa-4 mx-auto" 
      max-width="120vh"
      max-height="84vh"
      tonal
      min-width="1000px"
    >
      <v-toolbar
        color="dark"
      >
        <v-toolbar-title>My Tasks
            <v-btn 
              class="ml-5"
              v-if="!showAddTask"
              color="blue" 
              icon="mdi-text-box-plus-outline"
              @click="showAddTask = true"
            ></v-btn>
        </v-toolbar-title>
        <!-- TODO <v-btn variant="text" icon="mdi-sort"></v-btn> -->
      </v-toolbar>
      
      <v-text-field
        class="pt-3"
        v-if="showAddTask"
        v-model="newName"
        label="Add a Task"
        placeholder=""
        variant="outlined"
        color="blue"
        autofocus
        hide-details
        
        @keydown.enter="addTask(), newName='', showAddTask = false"  
        @keydown.esc="showAddTask = false"
      ></v-text-field>

      <v-list
        id="task_list"
        overflow-y="auto"
        height="68vh"
        lines="2"
      >
        <v-list-item
          v-for="task in tasks" 
          :key="task.id"
        >
          <v-list-item-avatar start>
            <v-hover
              v-slot="{ isHovering, props }"
            >
              <v-btn
                variant="text"
                :icon="isHovering ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'"
                :color="isHovering ? 'green' : 'dark'"
                @click="removeTask(task.id)"
                v-bind="props"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <v-list-item-header>
            <v-list-item-title>{{ task.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-header>

          <v-spacer></v-spacer>
          <v-list-item-avatar>
            <v-hover
              v-slot="{ isHovering, props }"
            >
              <v-btn
                variant="text"
                :icon="isHovering ? 'mdi-star' : 'mdi-star-outline'"
                v-bind="props"
                :color="isHovering ? 'yellow' : 'dark'"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar> 
          <v-list-item-avatar>
            <v-hover
              v-slot="{ isHovering, props }"
            >
              <v-btn
                variant="text"
                :icon="isHovering ? 'mdi-pencil' : 'mdi-pencil-outline'"
                :color="isHovering ? 'blue' : 'dark'"
                @click="setTaskInputFields(task)"
                v-bind="props"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <v-list-item-avatar>
            <v-hover
              v-slot="{ isHovering, props }"
            >
              <v-btn
                variant="text"
                :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'"
                :color="isHovering ? 'red' : 'dark'"
                @click="deleteConfirmation = true, deleteTaskID = task.id, deleteTaskName = task.name"
                v-bind="props"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>        
        </v-list-item>  
      </v-list>

      <v-container>
        <v-row justify="center">
        <v-dialog
          v-model="editTaskDialog"
          persistent
        >
          <v-card 
            class="pa-4 mx-auto"
            min-height="50%"
            min-width="600px"
          >
            <v-card-title>
              <span class="text-h5">Task</span>
            </v-card-title>
            <v-card-text>
            <v-container>
              <v-text-field
                v-model="editName"
              ></v-text-field>
              <v-textarea
                label="Note"
                v-model="editDescription"
              ></v-textarea>
            </v-container>
            </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  text
                  @click="editTaskDialog = false"
                >Cancel</v-btn>
                <v-btn
                  color="blue-darken-1"
                  text
                  
                  @click="editTask(); editTaskDialog = false"
                  >Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>

      <v-container>
        <v-row justify="center">
          <v-dialog
            v-model="deleteConfirmation"
            persistent
          >
            <v-card>
              <v-card-title class="text-h5">
                Delete Task
              </v-card-title>
              <v-card-text>"{{deleteTaskName}}" will be permanatly deleted.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  @click="deleteConfirmation = false, removeTask(deleteTaskID)"
                >
                  Delete
                </v-btn>
                <v-btn
                  @click="deleteConfirmation = false"
                >
                  Cancel
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
import "@/store/index.js";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

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
      editTaskID: null,

      editTaskDialog: false,
      showAddTask: false,
      deleteConfirmation: false,
      deleteTaskID: null,
      deleteTaskName: ""
    };
  },
  created() {
    this.getTasks()
  },
  methods: {
    getTasks() {
      const config = {
        headers: {
          // authorization: localStorage.getItem("auth_token"),
          authorization: this.getAuthToken,
        },
      };
      axios
        .get(`${BASE_URL}/tasks`, config)
        .then((response) => {
          this.tasks = response.data
          })
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
          $("#task_list").scrollTop(0)
        })
        .catch((error) => console.log(error));
    }, 
    editTask() {
      const data = {
        task: {
          name: this.editName,
          description: this.editDescription,
          user_id: this.getUserID
        }
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${this.editTaskID}`, data, config)
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
    setTaskInputFields(task) {
      this.editTaskDialog = true
      this.editTaskID = task.id;
      this.editName = task.name;
      this.editDescription = task.description;
      this.dateCreated = task.created_at
    }, 
  },
};
</script>

