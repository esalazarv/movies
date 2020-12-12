<template>
  <ValidationObserver ref="form" v-slot="{}">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('movies.attributes.name')"
            rules="required"
          >
            <v-text-field
              :label="$t('movies.attributes.name')"
              v-model="movie.name"
              :error-messages="errors"
              clearable
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('movies.attributes.duration')"
            rules="required"
          >
            <v-text-field
              type="time"
              :label="$t('movies.attributes.duration')"
              v-model="movie.duration"
              :error-messages="errors"
              clearable
              step="1"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-switch
            inset
            v-model="movie.active"
            :label="
              movie.active
                ? $t('movies.labels.active')
                : $t('movies.labels.inactive')
            "
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('movies.attributes.publish_date')"
            rules="required"
          >
            <v-menu
              ref="menu"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="publishDate"
                  :label="$t('movies.attributes.publish_date')"
                  prepend-icon="fa fa-calendar"
                  v-bind="attrs"
                  v-on="on"
                  :error-messages="errors"
                  readonly
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker ref="picker" v-model="publishDate"></v-date-picker>
            </v-menu>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="primary"
            @click="submit"
            :loading="isLoading"
            :disabled="isLoading"
          >
            {{ $t("movies.labels.submit") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!--Success process  -->
    <v-dialog v-model="successDialogOpen" max-width="300">
      <v-card>
        <v-card-title class="headline">{{
          successMessages.title
        }}</v-card-title>
        <v-card-text>{{ successMessages.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="green darken-1" @click="accept">
            {{ successMessages.accept }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error submit form  -->
    <v-dialog v-model="errorDialogOpen" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ errorMessages.title }}</v-card-title>
        <v-card-text>{{ errorMessages.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="errorDialogOpen = false">
            {{ errorMessages.accept }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "MovieForm",
  props: {
    successMessagesPath: {
      type: String,
      default: "movies.labels.dialogs.successCreate"
    },
    errorMessagesPath: {
      type: String,
      default: "movies.labels.dialogs.errorCreate"
    }
  },
  data() {
    return {
      successDialogOpen: false,
      errorDialogOpen: false
    };
  },
  computed: {
    // Map state from movies module (Vuex)
    ...mapState("movies", {
      isLoading: state => state.isLoading,
      movie: state => state.movie
    }),
    successMessages() {
      return this.$t(this.successMessagesPath);
    },
    errorMessages() {
      return this.$t(this.errorMessagesPath);
    },
    publishDate: {
      get() {
        return this.movie.publish_date
          ? this.$moment(this.movie.publish_date, "YYYY-MM-DD").format(
              "YYYY-MM-DD"
            )
          : "";
      },
      set(value) {
        this.movie.publish_date = value;
      }
    }
  },

  methods: {
    // Map actions from movies module (Vuex)
    ...mapActions("movies", ["create", "update"]),

    async submit() {
      if (await this.$refs.form.validate()) {
        const regex = /^\d{2}:\d{2}$/gm;
        this.movie.duration = regex.test(this.movie.duration)
          ? `${this.movie.duration}:00`
          : this.movie.duration;
        if (this.movie.id) {
          this.update({ ...this.movie })
            .then(() => (this.successDialogOpen = true))
            .catch(() => (this.errorDialogOpen = true));
        } else {
          this.create({ ...this.movie, publish_date: this.publishDate })
            .then(() => (this.successDialogOpen = true))
            .catch(() => (this.errorDialogOpen = true));
        }
      }
    },
    accept() {
      this.successDialogOpen = false;
      this.$emit("success", this.movie);
    }
  }
};
</script>

<style scoped></style>
