<template>
  <v-container>
    <v-card
      class="task-list-container pa-4 mx-auto mt-n7"
      max-width="120vh"
      max-height="86vh"
      min-width="1000px"
      flat
    >
      <!-- "My Tasks" toolbar -->
      <v-toolbar elevated class="task-list-toolbar">
        <v-toolbar-title class="text-h6"
          >My Tasks
          <!-- Add new task button -->
          <v-btn
            class="ml-5"
            v-if="!showAddTask"
            color="blue"
            prepend-icon="mdi-text-box-plus-outline"
            @click="showAddTask = true"
            >Add a task
            <v-tooltip activator="parent" location="top"
              >Add a task</v-tooltip
            ></v-btn
          >
        </v-toolbar-title>
        <!-- Sort tasks button-->
        <template v-if="localSort != 'default' || !localSort">
          <v-btn
            variant="outlined"
            size="small"
            :prepend-icon="
              localSortOrder == 'asc' || !localSortOrder
                ? 'mdi-arrow-down'
                : 'mdi-arrow-up'
            "
            @click="toggleSortOrder()"
            >Sorted {{ localSort }}
            <v-tooltip activator="parent" location="top"
              >Toggle ASC/DESC</v-tooltip
            >
          </v-btn>
          <v-btn
            class="mx-1"
            variant="outlined"
            size="small"
            width="10px"
            @click="setSort('default'), setSortOrder('asc')"
          >
            <v-icon size="x-large">mdi-close</v-icon>
            <v-tooltip activator="parent" location="top">Clear sort</v-tooltip>
          </v-btn>
          <!-- Sort tasks menu -->
        </template>
        <v-menu location="right">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text">
              <v-icon size="x-large">mdi-sort</v-icon>
              <v-tooltip activator="parent" location="top"
                >Sort Tasks</v-tooltip
              ></v-btn
            >
          </template>
          <v-list>
            <v-list-item>
              <v-btn @click="setSort('by importance')">Importance</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="setSort('by due date')">Due Date</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="setSort('alphabetically')">Alphabetically</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="setSort('by creation date')">Creation Date</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>

      <!-- Prompt to add new task -->
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
      ></v-text-field>
      <!--  Task list -->
      <v-list
        class="task-list mt-n2"
        v-if="tasks != null"
        height="76vh"
        lines="2"
        overflow-y="auto"
      >
        <!-- Incompleted tasks list -->
        <v-list-item
          class="task-list-item"
          v-for="task in filterIncompletedTasks"
          :key="task.id"
        >
          <!-- Set task as completed button -->
          <v-list-item-avatar start>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                :color="isHovering ? 'green' : 'dark'"
                @click="setCompleted(task)"
                v-bind="props"
              >
                <v-icon
                  size="x-large"
                  :icon="
                    isHovering
                      ? 'mdi-checkbox-marked-outline'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></v-icon>
                <v-tooltip activator="parent" location="top"
                  >Complete Task</v-tooltip
                >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <!-- Task name and description -->
          <v-list-item-header>
            <v-list-item-title
              :class="
                completedTaskID == task.id ? 'text-decoration-line-through' : ''
              "
              >{{ task.name }}</v-list-item-title
            >
            <v-list-item-subtitle v-if="task.description && task.due_date">
              <span
                :class="taskOverdue.includes(task.id) ? 'task-overdue' : ''"
              >
                <v-icon class="mb-1" size="x-small">mdi-calendar</v-icon>
                {{ formatTaskDueDate(task) }}
              </span>
              <v-icon class="ml-2 mb-1 mr-1" size="x-small"
                >mdi-note-outline</v-icon
              >{{ task.description }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else-if="task.description">
              <v-icon class="mb-1 mr-1" size="x-small">mdi-note-outline</v-icon
              >{{ task.description }}</v-list-item-subtitle
            >
            <v-list-item-subtitle v-else-if="task.due_date">
              <span
                :class="taskOverdue.includes(task.id) ? 'task-overdue' : ''"
              >
                <v-icon class="mb-1" size="x-small">mdi-calendar</v-icon>
                {{ formatTaskDueDate(task) }}</span
              ></v-list-item-subtitle
            >
          </v-list-item-header>

          <v-spacer></v-spacer>
          <!-- Set task as important button-->
          <v-list-item-avatar>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                v-bind="props"
                :color="isHovering || task.important ? 'yellow' : 'dark'"
                @click="setImportant(task)"
              >
                <v-icon
                  size="x-large"
                  :icon="
                    isHovering || task.important
                      ? 'mdi-star'
                      : 'mdi-star-outline'
                  "
                ></v-icon>
                <v-tooltip
                  activator="parent"
                  location="top"
                  :text="
                    task.important ? 'Remove importance' : 'Mark as important'
                  "
                ></v-tooltip>
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <!-- Edit task details button -->
          <v-list-item-avatar>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                :color="isHovering ? 'blue' : 'dark'"
                @click="setTaskInputFields(task)"
                v-bind="props"
              >
                <v-icon
                  size="x-large"
                  :icon="isHovering ? 'mdi-pencil' : 'mdi-pencil-outline'"
                ></v-icon>
                <v-tooltip activator="parent" location="top"
                  >Edit task details</v-tooltip
                >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
          <!-- Delete task button -->
          <v-list-item-avatar>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="text"
                :color="isHovering ? 'red' : 'dark'"
                @click="
                  (deleteConfirmation = true),
                    (deleteTaskID = task.id),
                    (deleteTaskName = task.name)
                "
                v-bind="props"
              >
                <v-icon
                  size="x-large"
                  :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'"
                ></v-icon>
                <v-tooltip activator="parent" location="top"
                  >Remove Task</v-tooltip
                >
              </v-btn>
            </v-hover>
          </v-list-item-avatar>
        </v-list-item>

        <!-- Show completed tasks button -->
        <v-list-item
          class="mb-n3"
          v-if="Object.keys(filterCompletedTasks).length > 0"
        >
          <v-btn
            class="ml-n4"
            @click="showCompletedTasks = !showCompletedTasks"
            :prepend-icon="
              showCompletedTasks ? 'mdi-chevron-down' : 'mdi-chevron-right'
            "
            color="blue"
            >Completed Tasks {{ Object.keys(filterCompletedTasks).length }}
            <v-tooltip
              activator="parent"
              location="top"
              :text="
                showCompletedTasks
                  ? 'Collapse completed tasks'
                  : 'Expand completed tasks'
              "
            ></v-tooltip>
          </v-btn>
        </v-list-item>
        <!-- Task list -->
        <v-list class="task-list" v-if="showCompletedTasks" lines="2">
          <!-- Completed tasks list -->
          <v-list-item
            class="task-list-item"
            v-for="task in filterCompletedTasks"
            :key="task.id"
          >
            <!-- Set task as incompleted -->
            <v-list-item-avatar start>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  :color="isHovering ? 'dark' : 'green'"
                  @click="setCompleted(task)"
                  v-bind="props"
                >
                  <v-icon
                    size="x-large"
                    :icon="
                      isHovering
                        ? 'mdi-checkbox-blank-outline'
                        : 'mdi-checkbox-marked-outline'
                    "
                  ></v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Mark task as incomplete</v-tooltip
                  >
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
            <!-- Task name and description button -->
            <v-list-item-header>
              <v-list-item-title class="text-decoration-line-through">{{
                task.name
              }}</v-list-item-title>
              <v-list-item-subtitle v-if="task.description && task.due_date">
                <span
                  :class="taskOverdue.includes(task.id) ? 'task-overdue' : ''"
                >
                  <v-icon class="mb-1" size="x-small">mdi-calendar</v-icon>
                  {{ formatTaskDueDate(task) }}</span
                >
                <v-icon class="ml-2 mb-1 mr-1" size="x-small"
                  >mdi-note-outline</v-icon
                >{{ task.description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else-if="task.description">
                <v-icon class="mb-1 mr-1" size="x-small"
                  >mdi-note-outline</v-icon
                >{{ task.description }}</v-list-item-subtitle
              >
              <v-list-item-subtitle v-else-if="task.due_date">
                <span
                  :class="taskOverdue.includes(task.id) ? 'task-overdue' : ''"
                >
                  <v-icon class="mb-1" size="x-small">mdi-calendar</v-icon>
                  {{ formatTaskDueDate(task) }}</span
                ></v-list-item-subtitle
              >
            </v-list-item-header>
            <v-spacer></v-spacer>
            <!-- Set task as important button -->
            <v-list-item-avatar>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  :color="isHovering || task.important ? 'yellow' : 'dark'"
                  @click="setImportant(task)"
                >
                  <v-icon
                    size="x-large"
                    :icon="
                      isHovering || task.important
                        ? 'mdi-star'
                        : 'mdi-star-outline'
                    "
                  ></v-icon>
                  <v-tooltip
                    activator="parent"
                    location="top"
                    :text="
                      task.important ? 'Remove importance' : 'Mark as important'
                    "
                  ></v-tooltip>
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
            <!-- Edit task button -->
            <v-list-item-avatar>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  :color="isHovering ? 'blue' : 'dark'"
                  @click="setTaskInputFields(task)"
                  v-bind="props"
                >
                  <v-icon
                    size="x-large"
                    :icon="isHovering ? 'mdi-pencil' : 'mdi-pencil-outline'"
                  ></v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Edit task details</v-tooltip
                  >
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
            <!-- Delete task button -->
            <v-list-item-avatar>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  variant="text"
                  :color="isHovering ? 'red' : 'dark'"
                  @click="
                    (deleteConfirmation = true),
                      (deleteTaskID = task.id),
                      (deleteTaskName = task.name)
                  "
                  v-bind="props"
                >
                  <v-icon
                    size="x-large"
                    :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'"
                  ></v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Remove Task</v-tooltip
                  >
                </v-btn>
              </v-hover>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-list>

      <!-- Edit task dialog -->
      <v-container>
        <v-row justify="center">
          <v-dialog v-model="editTaskDialog" persistent>
            <v-card class="pa-4 mx-auto" min-height="50%" min-width="600px">
              <v-card-title>
                <span class="text-h5">Task Details</span>
              </v-card-title>
              <v-card-text>
                <!-- Edit task name, description, and due date -->
                <v-container>
                  <v-text-field
                    label="Task"
                    v-model="editName"
                    variant="outlined"
                    density="compact"
                    counter
                    maxlength="75"
                    @keydown.enter="editTask(), (editTaskDialog = false)"
                  ></v-text-field>
                  <v-textarea
                    label="Note"
                    v-model="editDescription"
                    variant="outlined"
                    counter
                    maxlength="200"
                    density="compact"
                    @keydown.ctrl.enter="editTask(), (editTaskDialog = false)"
                  ></v-textarea>
                  <v-text-field
                    v-if="editDueDate || editDueDate != ''"
                    label="Due Date"
                    v-model="editDueDate"
                    variant="outlined"
                    clearable
                    clear-icon="mdi-close"
                    readonly
                    density="compact"
                  ></v-text-field>
                  <v-text-field
                    v-else
                    type="date"
                    label="Add due date"
                    v-model="editDueDate"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
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

      <!-- Delete task confirmation dialog -->
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
    ...mapGetters([
      "getAuthToken",
      "getUserEmail",
      "getUserID",
      "isLoggedIn",
      "getUserSort",
      "getUserSortOrder",
    ]),
    filterIncompletedTasks() {
      let sortedTasks;
      // let sort = this.getUserSort;
      let sort = this.localSort;
      if (sort == "by importance") {
        sortedTasks = this.sortTasksByImportance;
      } else if (sort == "by due date") {
        sortedTasks = this.sortTasksByDueDate;
      } else if (sort == "alphabetically") {
        sortedTasks = this.sortTasksByAlphabetical;
      } else if (sort == "by creation date") {
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
      // let sort = this.getUserSort;
      let sort = this.localSort;
      if (sort == "by importance") {
        sortedTasks = this.sortTasksByImportance;
      } else if (sort == "by due date") {
        sortedTasks = this.sortTasksByDueDate;
      } else if (sort == "alphabetically") {
        sortedTasks = this.sortTasksByAlphabetical;
      } else if (sort == "by creationDate") {
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
      return this.localSortOrder == "asc" || !this.localSortOrder
        ? sortedTasks
        : sortedTasks.reverse();
    },
    sortTasksByDueDate() {
      let sortedTasks;
      if (this.localSortOrder == "asc" || !this.localSortOrder) {
        sortedTasks = this.tasks.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
      } else {
        sortedTasks = this.tasks.sort((a, b) => {
          let dateA = a.due_date
            ? new Date(a.due_date)
            : new Date(8640000000000000);
          let dateB = b.due_date
            ? new Date(b.due_date)
            : new Date(8640000000000000);
          return dateB.getTime() - dateA.getTime();
        });
      }
      return sortedTasks.reverse();
      // let sortedTasks = this.tasks.sort(
      //   (a, b) => new Date(a.due_date) - new Date(b.due_date)
      // );
      // return this.localSortOrder == "asc" || !this.localSortOrder
      //   ? sortedTasks.reverse()
      //   : sortedTasks;
    },
    sortTasksByAlphabetical() {
      let sortedTasks = this.tasks.sort((a, b) => a.name.localeCompare(b.name));
      return this.localSortOrder == "asc" || !this.localSortOrder
        ? sortedTasks
        : sortedTasks.reverse();
    },
    sortTasksByCreationDate() {
      let sortedTasks = this.tasks.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      return this.localSortOrder == "asc" || !this.localSortOrder
        ? sortedTasks.reverse()
        : sortedTasks;
    },
  },
  data() {
    return {
      tasks: null,
      dateCreated: null,
      newName: "",
      newDescription: "",
      editName: "",
      editDescription: "",
      editTaskID: null,
      editDueDate: null,
      editTaskDialog: false,
      localSort: "",
      localSortOrder: "",

      showAddTask: false,
      deleteConfirmation: false,
      deleteTaskID: null,
      deleteTaskName: "",

      completedTaskID: null,
      isTaskCompleted: false,
      showCompletedTasks: false,

      importantTaskID: null,
      taskOverdue: [],
    };
  },
  mounted() {
    this.getTasks();
    this.localSort = !this.getUserSort ? "default" : this.getUserSort;
    this.localSortOrder = !this.getUserSortOrder
      ? "asc"
      : this.getUserSortOrder;
  },
  methods: {
    getTasks() {
      const config = {
        headers: {
          Authorization: this.getAuthToken,
        },
      };
      axios
        .get(`${BASE_URL}/tasks`, config)
        .then((response) => {
          this.tasks = response.data;
          this.isTaskOverdue();
        })
        .catch((error) => console.log(error));
    },
    addTask() {
      let taskName = this.newName == "" ? "Untitled task" : this.newName;
      const data = {
        task: {
          name: taskName,
          description: this.newDescription,
          user_id: this.getUserID,
        },
      };
      const config = {
        headers: {
          Authorization: this.getAuthToken,
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
      let dueDate;
      if (this.editDueDate == "Today") {
        dueDate = new Date();
        dueDate.setDate(dueDate.getDate() - 1);
      } else if (this.editDueDate == "Tomorrow") {
        dueDate = new Date();
        dueDate.setDate(dueDate.getDate());
      } else {
        dueDate = this.editDueDate;
      }
      let taskName = this.editName == "" ? "Untitled task" : this.editName;
      const data = {
        task: {
          name: taskName,
          description: this.editDescription,
          due_date: dueDate,
          user_id: this.getUserID,
        },
      };
      const config = {
        headers: {
          Authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${this.editTaskID}`, data, config)
        .then(() => this.getTasks())
        .catch((error) => console.log(error));
    },
    removeTask(id) {
      const config = {
        headers: {
          Authorization: this.getAuthToken,
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
          Authorization: this.getAuthToken,
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
          Authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/tasks/${task.id}`, data, config)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    setSort(selectedSort) {
      this.localSort = selectedSort;
      const data = {
        user: {
          sort: selectedSort,
        },
      };
      const config = {
        headers: {
          Authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/users`, data, config)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    setSortOrder(selectedOrder) {
      this.localSortOrder = selectedOrder;
      const data = {
        user: {
          sort_order: selectedOrder,
        },
      };
      const config = {
        headers: {
          Authorization: this.getAuthToken,
        },
      };
      axios
        .put(`${BASE_URL}/users`, data, config)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => console.log(error));
    },
    toggleSortOrder() {
      let sortOrder =
        this.localSortOrder == "asc" || !this.localSortOrder ? "desc" : "asc";
      this.setSortOrder(sortOrder);
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
      this.editDueDate = this.formatTaskDueDate(task);
    },
    isTaskOverdue() {
      this.taskOverdue = [];
      for (let i in this.tasks) {
        let task = this.tasks[i];
        let dueDate = new Date(task.due_date);
        dueDate.setDate(dueDate.getDate() + 1);
        let today = new Date();
        if (dueDate.getTime() - today.getTime() < 0) {
          this.taskOverdue.push(task.id);
        }
      }
    },
    formatTaskDueDate(task) {
      if (task.due_date == null) {
        return "";
      }
      let dueDate = new Date(task.due_date);
      dueDate.setDate(dueDate.getDate() + 1);
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (dueDate.toDateString() == today.toDateString()) {
        return `Today`;
      } else if (dueDate.toDateString() == tomorrow.toDateString()) {
        return "Tomorrow";
      }
      dueDate = dueDate.toDateString().split(" ");
      let formatedDueDate = `${dueDate[0]}, ${dueDate[1]} ${dueDate[2]} ${dueDate[3]}`;
      return formatedDueDate;
    },
  },
};
</script>

<style scoped>
.task-list-toolbar {
  background: rgba(220, 220, 220, 0.8);
  border-color: white !important;
  border-color: white !important;
  border-radius: 5px;
}
.task-list-container {
  background: rgba(255, 255, 255, 0);
  border-color: white !important;
}
.task-list {
  background: rgba(255, 255, 255, 0);
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
.wrap-text {
  white-space: normal;
}
.task-overdue {
  color: red !important;
}
</style>

