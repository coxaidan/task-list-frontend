// TODO

import axios from "axios";

const BASE_URL = "http://localhost:3000";

const state = {
  task: {
    id: {},
    name: {},
    description: {},
  },
};
const getters = {
  getTaskName(state) {
    return state.task?.name;
  },
  getTaskDescription(state) {
    return state.task?.description;
  },
  getTaskID(state) {
    return state.task?.id;
  },
};
const actions = {
    getTasks({ commit }, payload) {
        const config = {
          headers: {
            Authorization: payload.auth_token,
          },
        };
        new Promise((resolve, reject) => {
          axios
            .get(`${BASE_URL}/tasks`, config)
            .then((response) => {
              commit("setTaskData", response);
              resolve(response);

            })
            .catch((error) => {
              reject(error);
            });
        });
    },
    addTask({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios
              .post(`${BASE_URL}/tasks`, payload)
              .then((response) => {
                commit("setTaskData", response);
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
        });
    },
    editTask({ commit }, payload, data) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${BASE_URL}/tasks/${this.editTaskID}`, data, config)
                .then((response) => {
                    commit("setTaskData", response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },  
    removeTask({ commit }) {
        const config = {
          headers: {
            authorization: this.getAuthToken,
          },
        };       
        new Promise((resolve, reject) => {
            axios
            .delete(`${BASE_URL}/tasks/${id}`, config)
            .then(() => {
              commit("deleteTask");
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }) 
      },
};
const mutations = {
  setTaskInfo(state, data) {
    state.user = data.data.user;
    state.auth_token = data.headers.authorization;
    axios.defaults.headers.common["Authorization"] = data.headers.authorization;
    localStorage.setItem("auth_token", data.headers.authorization);
  },
  setUserInfoFromToken(state, data) {
    state.user = data.data.user;
    state.auth_token = localStorage.getItem("auth_token");
    
  },
  resetUserInfo(state) {
    state.user = {
      id: null,
      username: null,
      email: null,
    };
    state.auth_token = null;
    localStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};


