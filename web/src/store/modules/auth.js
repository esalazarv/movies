import AuthService from "@/services/AuthService";
import SanctumService from "@/services/SanctumService";

const defaultState = {
  isLoading: false,
  access: {
    token_type: null,
    access_token: null
  },
  user: {
    id: null,
    name: "",
    email: "",
    avatar: {
      url: ""
    }
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
    },
    setUser(state, payload) {
      state.user = { ...state.user, ...payload };
    }
  },

  getters: {
    authenticated: state => {
      return !!state.access.access_token;
    },
    user: state => {
      return state.user;
    },
  },

  actions: {
    authenticate({ state, commit, rootState, dispatch }, credentials) {
      const sanctumService = new SanctumService();
      commit("setLoading", true);
      return sanctumService
        .getCSRFCookie()
        .then(async response => {
          const authService = new AuthService();
          return await authService.authenticate(credentials).then(response => {
            commit("setAccess", response);
            return response;
          });
        })
        .then(() => dispatch("getAuthUser"))
        .finally(() => commit("setLoading", false));
    },
    getAuthUser({ state, commit, rootState }) {
      const service = new AuthService();
      return service.me().then(response => {
        commit("setUser", response.data);
        return response;
      });
    },
    logout({ state, commit, rootState }) {
      commit("setAccess", defaultState.access);
      commit("setUser", defaultState.user);
    }
  }
};
