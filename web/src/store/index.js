import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import application from "./modules/application";
import auth from "./modules/auth";
import movies from "./modules/movies";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer: state => ({
    application: state.application,
    auth: state.auth,
    movies: state.movies
  })
});

const store = new Vuex.Store({
  modules: {
    application,
    auth,
    movies
  },
  plugins: [vuexPersist.plugin]
});

export default store;
