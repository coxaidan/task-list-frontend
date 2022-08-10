import axios from "axios";

const BASE_URL = "http://localhost:3000";

const state = {
  auth_token: null,
  user: {
    id: null,
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    sort: null,
    sort_order: null,
    background: null,
  },
};
const getters = {
  getAuthToken(state) {
    return state.auth_token;
  },
  getUserEmail(state) {
    return state.user?.email;
  },
  getUserID(state) {
    return state.user?.id;
  },
  isLoggedIn(state) {
    const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  },
  getUserFirstName(state) {
    return state.user?.first_name;
  },
  getUserLastName(state) {
    return state.user?.last_name;
  },
  getUserSort(state) {
    return state.user?.sort || "default";
  },
  getUserSortOrder(state) {
    return state.user?.sort_order || "asc";
  },
  getUserBackground(state) {
    return state.user?.background || 1
  },
};
const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/users`, payload)
        .then(response => {
          commit("setUserInfo", response);
          commit("setUserName", response)
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async loginUser({ commit }, payload) {
    try {
      const response = await axios
        .post(`${BASE_URL}/users/sign_in`, payload);
      commit("setUserInfo", response);
    } catch (error) {
      return error.response.status;
    }
  },
  // loginUser({ commit }, payload) {
  //   new Promise((resolve, reject) => {
  //     axios
  //       .post(`${BASE_URL}/users/sign_in`, payload)
  //       .then(response => {
  //         commit("setUserInfo", response);
  //         resolve(response);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },
  logoutUser({ commit }) {
    const config = {
      headers: {
        // Authorization: state.auth_token
        Authorization: localStorage.auth_token
      },
    };
    new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/users/sign_out`, config)
        .then(() => {
          commit("resetUserInfo");
          resolve();
        })
        .catch((error) => {
          console.log(error)
          reject(error);
        });
    });
  },
  loginUserWithToken({ commit }, payload) {
    const config = {
      headers: {
        Authorization: payload.auth_token,
      },
    };
    // console.log(config.headers.Authorization)
    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}/member-data`, config)
        .then((response) => {
          commit("setUserInfoFromToken", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  editUserName({ commit }, payload) {
    commit("setEditUserName", payload)
  },
  editUserBackground({ commit }, payload) {
    commit("setUserBackground", payload)
  }
};
const mutations = {
  setUserInfo(state, data) {
    state.user = data.data.user;
    state.auth_token = data.headers.authorization;
    axios.defaults.headers.common["Authorization"] = data.headers.authorization;
    localStorage.setItem("auth_token", data.headers.authorization);
  },
  setUserName(state, data) {
    let response = JSON.parse(data.config.data)
    let firstName = response.user.first_name
    let lastName = response.user.last_name

    state.user.first_name = firstName
    state.user.last_name = lastName

    const name = {
      user: {
        first_name: state.user.first_name,
        last_name: state.user.last_name
      },
    };
    const config = {
      headers: {
        Authorization: state.auth_token,
      },
    };
    axios
      .put(`${BASE_URL}/users`, name, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  setEditUserName(state, data) {
    let firstName = data.user.first_name
    let lastName = data.user.last_name

    state.user.first_name = firstName
    state.user.last_name = lastName

    const name = {
      user: {
        first_name: state.user.first_name,
        last_name: state.user.last_name
      },
    };
    const config = {
      headers: {
        Authorization: state.auth_token,
      },
    };
    axios
      .put(`${BASE_URL}/users`, name, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  setUserBackground(state, data) {
    state.user.background = data.user.background
    const background = {
      user: {
        background: data.user.background
      }
    }
    const config = {
      headers: {
        Authorization: state.auth_token,
      },
    };
    axios
      .put(`${BASE_URL}/users`, background, config)
      .then(response => {
        console.log(response);
      })
      .catch((error) => console.log(error));

  },
  setUserInfoFromToken(state, data) {
    state.user = data.data.user;
    state.auth_token = localStorage.getItem("auth_token");
  },
  resetUserInfo(state) {
    state.user = {
      id: null,
      first_name: null,
      last_name: null,
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