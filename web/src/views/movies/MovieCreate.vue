<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("movies.create.title") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <movie-form @success="redirect"></movie-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import MovieForm from "@/views/movies/components/MovieForm";
import { mapMutations } from "vuex";

export default {
  name: "MovieCreate",
  components: { MovieForm },
  methods: {
    ...mapMutations("movies", ["selectMovie"]),
    redirect() {
      this.$router.push({ name: "movies" });
    }
  },
  created() {
    this.selectMovie({});
  }
};
</script>

<style scoped></style>
