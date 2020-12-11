import MovieService from "@/services/MovieService";

const defaultState = {
  isLoading: false,
  isDeleting: false,
  movies: [],
  movie: {
    id: null,
    name: "",
    active: true,
    image: {
      url: ""
    },
    duration: null,
    publish_date: null,
    created_at: null,
    updated_at: null
  },
  params: {
    query: ""
  },
  pagination: {
    from: 1,
    to: 1,
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 15
  }
};

export default {
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setDeleting(state, payload) {
      state.isDeleting = payload;
    },
    setParams(state, payload) {
      state.params = { ...state.params, ...payload};
    },
    setMovies(state, payload) {
      state.movies = [...payload];
    },
    selectMovie(state, payload) {
      state.movie = { ...defaultState.movie, ...payload };
    },
    selectMovieById(state, payload) {
      state.movie = { ...state.movies.find(item => item.id == payload) };
    },
    setPagination(state, payload) {
      state.pagination = { ...payload };
    },
    prependMovie(state, payload) {
      state.movies = [payload, ...state.movies];
    },
    removeMovie(state, payload) {
      state.movies = [...state.movies.filter(item => item.id !== payload.id)];
    },
    replaceMovie(state, payload) {
      const movies = [...state.movies];
      const index = movies.findIndex(item => item.id === payload.id);
      movies.splice(index, 1, payload);
      state.movies = [...movies];
    }
  },
  getters: {
    movies: state => state.movies,
    filters: state => ({
      ...state.params,
      page: state.pagination.current_page,
      page_size: state.pagination.per_page
    })
  },
  actions: {
    /**
     * Fetch movies by query filters
     * @param commit
     * @param filters
     * @returns {Promise<unknown>}
     */
    fetch({ commit }, filters = {}) {
      const movieService = new MovieService();
      commit("setLoading", true);
      console.log("[Movies redux] fetching");
      return movieService
        .search(filters)
        .then(response => {
          commit("setMovies", response.data);
          commit("setPagination", response.meta);
          console.log("[Movies redux] movies fetched");
        })
        .finally(() => commit("setLoading", false));
    },

    find({ commit }, id) {
      const movieService = new MovieService();
      commit("setLoading", true);
      console.log("[Movies redux] find");
      return movieService
          .find(id)
          .then(response => {
            commit("selectMovie", response.data);
            console.log("[Movies redux] movie found");
          })
          .finally(() => commit("setLoading", false));
    },

    create({ commit }, data) {
      const movieService = new MovieService();
      commit("setLoading", true);
      console.log("[Movies redux] creating");
      return movieService
          .create(data)
          .then(response => {
            console.log("[Movies redux] movies created");
            commit("prependMovie", response.data);
            commit("selectMovie", response.data);
            return response.data;
          })
          .finally(() => commit("setLoading", false));
    },

    /**
     * Update a movie
     * @param commit
     * @param id
     * @param data
     * @returns {*}
     */
    update({ commit }, id, data) {
      const movieService = new MovieService();
      console.log("[Movies redux] updating");
      commit("setLoading", true);
      return movieService
          .update(id, data)
          .then(response => {
            commit("replaceMovie", response.data);
            console.log("[Movies redux] movies updated");
          })
          .finally(() => commit("setLoading", false));
    },

    /**
     * Toggle movie status
     * @param commit
     * @param movie
     * @returns {*}
     */
    toggleStatus({ commit }, movie) {
      const movieService = new MovieService();
      console.log("[Movies redux] changing status");
      return movieService
        .update(movie.id, { active: movie.active })
        .then(response => {
          commit("replaceMovie", response.data);
          console.log("[Movies redux] movies status changed");
        });
    },

    /**
     * Delete movie
     * @param getters
     * @param commit
     * @param movie
     * @returns {Promise<unknown>}
     */
    destroy({ getters, commit }, movie) {
      const movieService = new MovieService();
      commit("setDeleting", true);
      console.log("[Movies redux] deleting movie");
      return movieService
        .delete(movie.id)
        .then(() => {
          commit("removeMovie", movie);
          console.log("[Movies redux] movies deleted");
        })
        .finally(() => commit("setDeleting", false));
    }
  }
};
