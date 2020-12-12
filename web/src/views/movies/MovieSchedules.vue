<template>
  <div>
    <h1 class="text-h3">{{ movie.name }}</h1>
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        :label="$t('schedules.labels.type')"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-color="getEventColor"
        :event-overlap-threshold="30"
        @click:day="selectTime"
        @click:event="editEvent"
      ></v-calendar>
    </v-sheet>

    <v-dialog v-model="openScheduleDialog" width="500">
      <v-card>
        <v-time-picker
          v-model="time"
          :landscape="true"
          ampm-in-title
        ></v-time-picker>

        <v-divider></v-divider>

        <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
        <v-card-actions>
          <v-btn
            v-if="event.id"
            color="red darken-1"
            text
            :disabled="isLoading"
            @click="remove"
          >
            {{ $t("schedules.labels.delete") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :disabled="isLoading" @click="saveEvent">
            {{ $t("schedules.labels.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "MovieSchedules",
  data: () => ({
    type: "month",
    types: ["month", "week", "day"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    value: "",
    openScheduleDialog: false,
    time: "00:00",
    date: null
  }),
  computed: {
    ...mapState("movies", {
      movie: state => state.movie
    }),
    ...mapState("schedules", {
      isLoading: state => state.isLoading,
      event: state => state.event
    }),
    ...mapGetters("schedules", ["events"])
  },
  methods: {
    ...mapMutations("movies", ["selectMovieById"]),
    ...mapMutations("schedules", ["setEvent", "setSchedules"]),
    ...mapActions("schedules", ["search", "create", "update", "delete"]),
    getEventColor(event) {
      return event.color;
    },
    selectTime(data) {
      this.openScheduleDialog = true;
      this.date = data.date;
    },
    saveEvent() {
      if (this.time) {
        const start_at = `${this.date} ${this.time}:00`;
        if (!this.event.id) {
          this.create({ movie_id: this.movie.id, start_at }).finally(() => {
            this.openScheduleDialog = false;
            this.time = "00:00";
          });
        } else {
          this.update({ ...this.event, start_at }).finally(() => {
            this.openScheduleDialog = false;
            this.time = "00:00";
          });
        }
      }
    },
    remove() {
      this.delete(this.event).finally(() => {
        this.openScheduleDialog = false;
        this.time = "00:00";
      });
    },
    editEvent(data) {
      const { id, movie_id, start_at } = data.event;
      this.time = this.$moment(start_at)
        .utc()
        .format("HH:mm");
      this.setEvent({ id, movie_id });
    }
  },
  mounted() {
    this.selectMovieById(this.$route.params.id);
    this.setSchedules([]);
    this.search({ movie_id: this.$route.params.id, all: true });
  }
};
</script>

<style scoped></style>
