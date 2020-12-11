const defaultState = {
  isLoading: false,
  access: {
    token_type: null,
    access_token: null
  }
};

export default {
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setAccess(state, payload) {
      state.access = payload;
    }
  },

  getters: {
    authenticated: state => {
      return !!state.access.access_token;
    }
  },

  actions: {
    authenticate({ state, commit, rootState, dispatch }, credentials) {
      // TODO: authenticate users
    },
    logout({ state, commit, rootState }) {
      commit("setAccess", defaultState.access);
      commit("setUser", defaultState.user);
    }
  }
};
