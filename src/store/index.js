import { createStore } from 'vuex';
import VuexPersistence from "vuex-persist";
import sessionManager from "@/store/modules/session_manager";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    sessionManager,
  },
  plugins: [vuexLocal.plugin],
})
