import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import application from "./modules/application";
import auth from "./modules/auth";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer: state => ({
    application: state.application,
    auth: state.auth
  })
});

const store = new Vuex.Store({
  modules: {
    application,
    auth
  },
  plugins: [vuexPersist.plugin]
});

export default store;
