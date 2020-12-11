export default {
  namespaced: true,
  state: {
    name: "App",
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
