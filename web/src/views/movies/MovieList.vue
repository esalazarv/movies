<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("movies.list.title") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div>
            <v-text-field
              append-icon="fa fa-search"
              v-model="params.query"
              :label="$t('movies.labels.search')"
              :disabled="isLoading"
              single-line
              hide-details
              @keyup="setParams(params)"
              @click:clear="clear"
              v-debounce="onQueryChange"
              clearable
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="primary" :to="{ name: 'movies:create' }">
            {{ $t("movies.labels.add") }}
            <v-icon right>fa fa-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="movies"
          :page.sync="pagination.current_page"
          :items-per-page="pagination.per_page"
          :loading="isLoading"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.avatar="{ item }">
            <v-avatar size="36px">
              <!--img :src="item.picture.url" :alt="item.name" /-->
            </v-avatar>
          </template>
          <template v-slot:item.active="{ item }">
            <v-switch
              v-model="item.active"
              inset
              @change="toggleStatus(item)"
              :label="
                item.active
                  ? $t('movies.labels.active')
                  : $t('movies.labels.inactive')
              "
            ></v-switch>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon :to="{ name: 'movies:edit', params: { id: item.id } }">
              <v-icon>fa fa-edit</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'movies:edit', params: { id: item.id } }">
              <v-icon>fa fa-calendar-alt</v-icon>
            </v-btn>
            <v-btn icon @click="confirmDelete(item)">
              <v-icon>fa fa-trash</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
        <v-pagination
            v-model="pagination.current_page"
            :length="pagination.last_page"
            @input="search"
            :disabled="isLoading"
        ></v-pagination>
      </v-card>
    </div>

    <v-dialog
      v-model="confirmDialogOpen"
      :persistent="isDeleting"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">{{
          $t("movies.labels.dialogs.confirmDelete.title")
        }}</v-card-title>
        <v-card-text>
          <i18n path="movies.labels.dialogs.confirmDelete.message" tag="p">
            <template #name>
              <strong>{{ movie ? movie.name : "" }}</strong>
            </template>
          </i18n>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="light darken-1"
            :disabled="isDeleting"
            text
            @click="confirmDialogOpen = false"
          >
            {{ $t("movies.labels.dialogs.confirmDelete.dismiss") }}
          </v-btn>
          <v-btn
            color="red darken-1"
            :loading="isDeleting"
            :disabled="isDeleting"
            text
            @click="remove()"
          >
            {{ $t("movies.labels.dialogs.confirmDelete.accept") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "MovieList",
  data() {
    return {
      movie: {},
      headers: [
        {
          text: this.$t("movies.attributes.image"),
          value: "avatar",
          align: "start",
          sortable: false
        },
        {
          text: this.$t("movies.attributes.name"),
          value: "name",
          sortable: false
        },
        {
          text: this.$t("movies.attributes.publish_date"),
          value: "publish_date",
          sortable: false
        },
        {
          text: this.$t("movies.attributes.duration"),
          value: "duration",
          sortable: false
        },
        {
          text: this.$t("movies.attributes.active"),
          value: "active",
          sortable: false
        },
        { text: "", value: "actions", align: "end", sortable: false }
      ],
      confirmDialogOpen: false
    };
  },
  computed: {
    // Map state from movies module (Vuex)
    ...mapState("movies", {
      isLoading: state => state.isLoading,
      isDeleting: state => state.isDeleting,
      params: state => state.params,
      pagination: state => state.pagination
    }),

    // Map getters from movies module (Vuex)
    ...mapGetters("movies", ["movies", "filters"])
  },
  methods: {
    // Map actions from movies module (Vuex)
    ...mapMutations("movies", ['setParams']),
    // Map actions from movies module (Vuex)
    ...mapActions("movies", ["fetch", "destroy", "toggleStatus"]),

    onQueryChange() {
      this.fetch({ ...this.filters, page: 1 });
    },

    search(options = {}) {
      console.log("[Movies] searching");
      this.fetch({ ...this.filters, ...options });
    },

    clear() {
      this.updateQuery(this.params).finally(() => this.fetch());
    },

    async updateQuery(params) {
      await this.setParams(params);
    },

    remove() {
      console.log("[Movies] deleting");
      this.destroy(this.movie).finally(() => (this.confirmDialogOpen = false));
    },

    confirmDelete(movie) {
      this.confirmDialogOpen = true;
      this.movie = movie;
    }
  },
  mounted() {
    this.search();
    console.log("[Movies] mounted");
  }
};
</script>
