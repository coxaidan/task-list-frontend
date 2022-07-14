<template>
  <v-layout>
    <v-container>
      <v-navigation-drawer 
        v-model="drawer" 
        class="pa-md-4 mx-lg-auto" 
        temporary 
        location="right"
        width="400"
      >
        <div class="d-flex flex-row-reverse">
          <v-icon @click="drawer=null">mdi-close</v-icon>
        </div>
          <v-form
            ref="form"
            lazy-validation
            @onfocusout="editTask(selectedTaskID, editName, editDescription)"
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

          <div class="d-flex flex-row-reverse flex-colulmn">
            <v-icon @click="removeTask(selectedTaskID)">mdi-delete</v-icon>
          </div>  

        </v-navigation-drawer>

        <v-main>
          <v-card 
            class="pa-md-4 mx-lg-auto"
           tonal
          >
            <v-card-title>TASKS</v-card-title>
            <v-list 
              height="500"
              density="compact"
              overflow-y="auto"
              >
              <v-list-item 
                v-for="task in tasks" 
                :key="task.id" 
                @click.stop="drawer = !drawer" 
                @click="editTaskForm(task)" 
                lines="2"
                >            
                <v-list-item-header> 
                  <v-list-item-title v-text="task.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
                </v-list-item-header>
              </v-list-item>
            </v-list>
            <v-text-field
              v-model="newName"
              label="Add a Task"
              placeholder="Enter task"
              @keyup.enter="addTask"
            ></v-text-field>
          </v-card>
        </v-main>
      </v-container>
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
      // task: {
      //   names: [],
      //   descriptions: [],
      //   ids: []
      // },
      newName: "",
      newDescription: "",
      editName: "",
      editDescription: "",
      selectedTaskID: null,
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
        window.location.reload();
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
      this.selectedTaskID = task.id;
      this.editName = task.name;
      this.editDescription = task.description;
    }
  },
};
</script>
