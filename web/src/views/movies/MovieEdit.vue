<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("movies.create.title") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <movie-form
            success-messages-path="movies.labels.dialogs.successUpdate"
            error-messages-path="movies.labels.dialogs.errorUpdate"
        ></movie-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import MovieForm from "@/views/movies/components/MovieForm";
import {mapActions, mapMutations} from "vuex";
export default {
name: "MovieEdit",
  components: {MovieForm},
  methods: {
    ...mapMutations('movies', ["selectMovieById"]),
    // Map actions from movies module (Vuex)
    ...mapActions("movies", ["find"]),
  },
  mounted() {
    this.selectMovieById(this.$route.params.id);
    this.find(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>