import config from "@/config";

export default {
  namespaced: true,
  state: {
    name: config.app.name,
    layout: "guest-layout"
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    }
  },
  getters: {
    name: state => state.name
  },
  actions: {}
};
