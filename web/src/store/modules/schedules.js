import ScheduleService from "@/services/ScheduleService";
import moment from "moment";

const defaultState = {
  isLoading: false,
  schedules: [],
  event: {
    id: null,
    movie_id: null,
    start_at: null
  }
};
const colors = [
  "blue",
  "indigo",
  "deep-purple",
  "cyan",
  "green",
  "orange",
  "grey darken-1"
];
const rnd = (a, b) => Math.floor((b - a + 1) * Math.random()) + a;
export default {
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setSchedules(state, payload) {
      state.schedules = payload;
    },
    appendEvent(state, payload) {
      state.schedules = [...state.schedules, payload];
    },
    replaceEvent(state, payload) {
      const schedules = [...state.schedules];
      const index = schedules.findIndex(item => item.id === payload.id);
      schedules.splice(index, 1, payload);
      state.schedules = [...schedules];
    },
    removeEvent(state, payload) {
      state.schedules = [
        ...state.schedules.filter(item => item.id !== payload.id)
      ];
    },
    setEvent(state, payload) {
      state.event = { ...payload };
    }
  },
  getters: {
    events: state => {
      const events = state.schedules.map(event => {
        event.name = "";
        event.start = moment(event.start_at)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        event.end = moment(event.finish_at)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        event.color = colors[rnd(0, colors.length - 1)];
        event.timed = true;
        return event;
      });
      return events;
    }
  },
  actions: {
    search({ commit }, filters = {}) {
      const scheduleService = new ScheduleService();
      commit("setLoading", true);
      console.log("[Schedules redux] fetching");
      return scheduleService
        .search(filters)
        .then(response => {
          commit("setSchedules", response.data);
          console.log("[Schedules redux] Schedules fetched");
          return response.data;
        })
        .finally(() => commit("setLoading", false));
    },

    create({ commit }, data) {
      const scheduleService = new ScheduleService();
      commit("setLoading", true);
      console.log("[Schedules redux] creating");
      return scheduleService
        .create(data)
        .then(response => {
          commit("appendEvent", response.data);
          console.log("[Schedules redux] Schedules created");
          return response.data;
        })
        .finally(() => commit("setLoading", false));
    },

    update({ commit }, event) {
      const scheduleService = new ScheduleService();
      commit("setLoading", true);
      console.log("[Schedules redux] updating");
      return scheduleService
        .update(event.id, event)
        .then(response => {
          commit("replaceEvent", response.data);
          commit("setEvent", defaultState.event);
          console.log("[Schedules redux] Schedules updated");
          return response.data;
        })
        .finally(() => commit("setLoading", false));
    },

    delete({ commit }, event) {
      const scheduleService = new ScheduleService();
      commit("setLoading", true);
      console.log("[Schedules redux] deleting");
      return scheduleService
        .delete(event.id)
        .then(response => {
          commit("removeEvent", event);
          commit("setEvent", defaultState.event);
          console.log("[Schedules redux] Schedules deleted");
          return response.data;
        })
        .finally(() => commit("setLoading", false));
    }
  }
};
