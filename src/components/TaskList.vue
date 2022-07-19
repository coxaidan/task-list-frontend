<template>
  <v-container @keydown.esc="drawer = null">
      <!-- <v-navigation-drawer 
      v-model="drawer" 
      class="pa-5 mx-auto" 
      location="right"
      width="400"
    >
      <div class="d-flex flex-row-reverse">
        <v-icon @click="drawer=null">mdi-close</v-icon>
      </div>
      <v-form
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
          class="pa-md-4 mx-auto"
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
      </v-main> -->

    <v-card
      class="pa-5 mx-auto" 
      max-width="140vh"
      height="84vh"
      tonal
    >
      <v-card-title>Tasks</v-card-title>
      <v-divider/>

      <v-list
        overflow-y="auto"
        height="66vh"
      >
        <v-list-item
          v-for="task in tasks" 
          :key="task.id"
          :value="task"
          active-color="primary"
          lines="three"
          :title="task.name"
          :subtitle="task.description"
          @click="setTaskInputFields(task)"
        >
          <v-list-item-avatar start>
            <v-icon 
              v-if="!isCheckBoxHovered || hoveredCheckBoxID != task.id" 
              @mouseenter="isCheckBoxHovered = true, hoveredCheckBoxID = task.id"
            >mdi-checkbox-blank-outline</v-icon>
            <v-icon 
              v-if="isCheckBoxHovered && hoveredCheckBoxID == task.id" 
              @mouseleave="isCheckBoxHovered = false" 
              @click=" removeTask(task.id)"
            >mdi-checkbox-marked-outline</v-icon>
          </v-list-item-avatar>
        </v-list-item>   
      </v-list>

      <v-text-field
        v-model="newName"
        label="Add a Task"
        placeholder="Enter task"
        @keydown.enter="addTask()"
      ></v-text-field>
      

      <v-navigation-drawer
        class="mt-24"
        v-model="drawer" 
        location="right"
        width="400"
      >
        <v-card 
          tonal
          class="pa-5 mx-auto d-flex flex-column"
          width="auto"
          elevation="1"
          height="auto"
        >
          <v-card-item>
            <v-form
              @submit="editTask(selectedTaskID, editName, editDescription)"
              v-model="valid"
            >
              <v-text-field
                v-model="editName"
                label="Name"
                required
              ></v-text-field>

              <v-textarea
                v-model="editDescription"
                label="Description"
                no-resize
              ></v-textarea>

              <v-btn type=submit color="primary" location="right">Update</v-btn>
            </v-form>
          </v-card-item>
          <v-spacer/>
          <v-card-actions location="right">
            <v-btn @click="drawer=null" icon="mdi-close"></v-btn>
            <v-btn @click="removeTask(selectedTaskID)" icon="mdi-delete" right></v-btn>
          </v-card-actions>
        </v-card>
      </v-navigation-drawer>
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
      newName: "",
      newDescription: "",
      editName: "",
      editDescription: "",
      isCheckBoxHovered: false,
      hoveredCheckBoxID: null,
      open: ['task.id'],
      drawer: null,
      selectedTaskID: null
      
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
    setTaskInputFields(task) {
      if (this.drawer == task.id) {
        this.drawer = null
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
