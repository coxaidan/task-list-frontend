<template>
  <v-container>
    <v-card
      class="task-list-container pa-4 mx-auto mt-n7"
      max-width="120vh"
      max-height="86vh"
      min-width="1000px"
      flat
    >
      <v-toolbar color="white" elevated class="task-list-toolbar">
        <v-toolbar-title class="text-h6"
          >My Tasks
          <v-btn
            class="ml-5"
            v-if="!showAddTask"
            color="blue"
            icon="mdi-text-box-plus-outline"
            @click="showAddTask = true"
          ></v-btn>
        </v-toolbar-title>
        <template v-if="sort != 'default'">
          <v-btn
            variant="outlined"
            size="small"
            :prepend-icon="
              sortOrder == 'asc' ? 'mdi-arrow-down' : 'mdi-arrow-up'
            "
            @click="
              (sortOrder = sortOrder == 'asc' ? 'desc' : 'asc'), getTasks()
            "
            >Sorted {{ sort }}</v-btn
          >
          <v-btn
            variant="text"
            size="small"
            icon="mdi-close"
            @click="(sort = 'default'), getTasks()"
          ></v-btn>
        </template>
        <v-menu location="right">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text" icon="mdi-sort"></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn @click="(sort = 'by importance'), getTasks()"
                >Importance</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn @click="(sort = 'by due date'), getTasks()"
                >Due Date</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn @click="(sort = 'alphabetically'), getTasks()"
                >Alphabetically</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn @click="(sort = 'by creation date'), getTasks()"
                >Creation Date</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>

      <v-text-field
        class="task-list-item mb-n2"
        v-if="showAddTask"
        v-model="newName"
        label="Add a Task"
        variant="solo"
        color="blue"
        autofocus
        hide-details
        @keydown.enter="addTask(), (newName = ''), (showAddTask = false)"
        @keydown.esc="showAddTask = false"
        @blur="(newName = ''), (showAddTask = false)"
      ></v-text-field>
      <v-list
        class="task-list mt-n2"
        height="76vh"
        lines="2"
        overflow-y="auto"
        v-if="tasks != null"
      >
        <v-list-item
          class="task-list-item"
          v-for="task in filterIncompletedTasks"
          :key="task.id"
        >
          <v-list-item-avatar start>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                :icon="
                  isHovering
                    ? 'mdi-checkbox-marked-outline'
                    : 'mdi-checkbox-blank-outline'
                "
                :color="isHovering ? 'green' : 'dark'"
                @click="setCompleted(task)"
                v-bind="props"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <v-list-item-header>
            <v-list-item-title
              :class="
                completedTaskID == task.id ? 'text-decoration-line-through' : ''
              "
              >{{ task.name }}</v-list-item-title
            >
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-header>

          <v-spacer></v-spacer>
          <v-list-item-avatar>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                :icon="
                  isHovering || task.important ? 'mdi-star' : 'mdi-star-outline'
                "
                v-bind="props"
                :color="isHovering || task.important ? 'yellow' : 'dark'"
                @click="setImportant(task)"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <v-list-item-avatar>
            <v-hover v-slot="{ isHovering, props }">
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
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'"
                :color="isHovering ? 'red' : 'dark'"
                @click="
                  (deleteConfirmation = true),
                    (deleteTaskID = task.id),
                    (deleteTaskName = task.name)
                "
                v-bind="props"
              >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item class="mb-n3">
          <v-btn
            class="ml-n4"
            @click="this.showCompletedTasks = !this.showCompletedTasks"
            :prepend-icon="
              showCompletedTasks ? 'mdi-chevron-down' : 'mdi-chevron-right'
            "
            color="blue"
            >Completed</v-btn
          >
        </v-list-item>
        <v-list class="task-list" v-if="showCompletedTasks">
          <v-list-item
            class="task-list-item"
            v-for="task in filterCompletedTasks"
            :key="task.id"
          >
            <v-list-item-avatar start>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  :icon="
                    isHovering
                      ? 'mdi-checkbox-blank-outline'
                      : 'mdi-checkbox-marked-outline'
                  "
                  :color="isHovering ? 'dark' : 'green'"
                  @click="setCompleted(task)"
                  v-bind="props"
                >
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
            <v-list-item-header>
              <v-list-item-title class="text-decoration-line-through">
                {{ task.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ task.description }}
              </v-list-item-subtitle>
            </v-list-item-header>
            <v-spacer></v-spacer>
            <v-list-item-avatar>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  :icon="
                    isHovering || task.important
                      ? 'mdi-star'
                      : 'mdi-star-outline'
                  "
                  v-bind="props"
                  :color="isHovering || task.important ? 'yellow' : 'dark'"
                  @click="setImportant(task)"
                >
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
            <v-list-item-avatar>
              <v-hover v-slot="{ isHovering, props }">
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
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'"
                  :color="isHovering ? 'red' : 'dark'"
                  @click="
                    (deleteConfirmation = true),
                      (deleteTaskID = task.id),
                      (deleteTaskName = task.name)
                  "
                  v-bind="props"
                >
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-list>

      <v-container>
        <v-row justify="center">
          <v-dialog v-model="editTaskDialog" persistent>
            <v-card class="pa-4 mx-auto" min-height="50%" min-width="600px">
              <v-card-title>
                <span class="text-h5">Task</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editName"
                    variant="outlined"
                  ></v-text-field>
                  <v-textarea
                    label="Note"
                    v-model="editDescription"
                    variant="outlined"
                  ></v-textarea>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <p class="text-body-2">Created on {{ dateCreated }}</p>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  text
                  @click="editTaskDialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  text
                  @click="
                    editTask();
                    editTaskDialog = false;
                  "
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>

      <v-container>
        <v-row justify="center">
          <v-dialog v-model="deleteConfirmation" persistent>
            <v-card>
              <v-card-title class="text-h5"> Delete Task </v-card-title>
              <v-card-text
                >"{{ deleteTaskName }}" will be permanatly deleted.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  @click="
                    (deleteConfirmation = false), removeTask(deleteTaskID)
                  "
                >
                  Delete
                </v-btn>
                <v-btn @click="deleteConfirmation = false"> Cancel </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import store from "../store/index.js";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

const BASE_URL = "http://localhost:3000";

export default {
  name: "TaskList",
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
    filterIncompletedTasks() {
      let sortedTasks;
      if (this.sort == "by importance") {
        sortedTasks = this.sortTasksByImportance;
      } else if (this.sort == "alphabetically") {
        sortedTasks = this.sortTasksByAlphabetical;
      } else if (this.sort == "by creation date") {
        sortedTasks = this.sortTasksByCreationDate;
      } else {
        sortedTasks = this.tasks;
      }
      return sortedTasks.filter(
        (task) => task.completed == null || !task.completed
      );
    },
    filterCompletedTasks() {
      let sortedTasks;
      if (this.sort == "by importance") {
        sortedTasks = this.sortTasksByImportance;
      } else if (this.sort == "alphabetically") {
        sortedTasks = this.sortTasksByAlphabetical;
      } else if (this.sort == "by creationDate") {
        sortedTasks = this.sortTasksByCreationDate;
      } else {
        sortedTasks = this.tasks;
      }
      return sortedTasks.filter(
        (task) => task.completed !== null && task.completed
      );
    },
    sortTasksByImportance() {
      let sortedTasks = this.tasks.sort(
        (a, b) => Number(b.important) - Number(a.important)
      );

      return this.sortOrder == "asc" ? sortedTasks : sortedTasks.reverse();
    },
    sortTasksByAlphabetical() {
      let sortedTasks = this.tasks.sort((a, b) => a.name.localeCompare(b.name));
      return this.sortOrder == "asc" ? sortedTasks : sortedTasks.reverse();
    },
    sortTasksByCreationDate() {
      let sortedTasks = this.tasks.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      return this.sortOrder == "asc" ? sortedTasks.reverse() : sortedTasks;
    },
  },
  data() {
    return {
      // auth_token: "",
      // user: {

      // },
      tasks: null,
      dateCreated: null,
      newName: "",
      newDescription: "",
      editName: "",
      editDescription: "",
      editTaskID: null,

      editTaskDialog: false,
      showAddTask: false,
      deleteConfirmation: false,
      deleteTaskID: null,
      deleteTaskName: "",

      completedTaskID: null,
      isTaskCompleted: false,
      showCompletedTasks: false,

      importantTaskID: null,
      sort: "default",
      sortOrder: "asc",
    };
  },
  mounted() {
    // console.log(`Store in mounted: ${JSON.stringify(store)}`);
    this.getTasks();
  },
  methods: {
    getTasks() {
      // console.log(`getAuthToken in getTasks: ${this.getAuthToken}`)
      const config = {
        headers: {
          // authorization: localStorage.getItem("auth_token"),
          authorization: this.getAuthToken,
        },
      };
      axios
        .get(`${BASE_URL}/tasks`, config)
        .then((response) => {
          this.tasks = response.data;
        })
        .catch((error) => console.log(error));
    },
    addTask() {
      const data = {
        task: {
          name: this.newName,
          description: this.newDescription,
          user_id: this.getUserID,
        },
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .post(`${BASE_URL}/tasks`, data, config)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    editTask() {
      const data = {
        task: {
          name: this.editName,
          description: this.editDescription,
          user_id: this.getUserID,
        },
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${this.editTaskID}`, data, config)
        .then(() => {
          this.getTasks();
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
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    completeTask(task) {
      this.isTaskCompleted = !task.completed;

      const data = {
        task: {
          completed: this.isTaskCompleted,
          user_id: this.getUserID,
        },
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${this.completedTaskID}`, data, config)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    setImportant(task) {
      this.isTaskImportant = !task.important;

      const data = {
        task: {
          important: this.isTaskImportant,
          user_id: this.getUserID,
        },
      };
      const config = {
        headers: {
          authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${task.id}`, data, config)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    delay(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    },
    setCompleted(task) {
      this.completedTaskID = task.id;
      setTimeout(() => (this.completedTaskID = null), 500);
      this.completeTask(task);
    },
    setTaskInputFields(task) {
      this.editTaskDialog = true;
      this.editTaskID = task.id;
      this.editName = task.name;
      this.editDescription = task.description;
      this.dateCreated = new Date(task.created_at).toLocaleString();
    },
  },
};
</script>

<style scoped>
.task-list-toolbar {
  background: rgba(0, 0, 0, 0.8);
  border-color: white !important;
  border-color: white !important;
  border-radius: 5px;
}
.task-list-container {
  background: rgba(0, 0, 0, 0);
  border-color: white !important;
}
.task-list {
  background: rgba(0, 0, 0, 0);
  border-color: white !important;
}

.task-list-item {
  background-color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
  border-color: white !important;
  border-radius: 5px;
}

* {
  scrollbar-width: auto;
  scrollbar-color: lightgrey #ffffff;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0);
  margin-top: 12px;
  margin-bottom: 15px;
}

*::-webkit-scrollbar-thumb {
  background-color: lightgrey;
  border-radius: 10px;
  border: 3px solid rgba(255, 255, 255, 0);
}
</style>

