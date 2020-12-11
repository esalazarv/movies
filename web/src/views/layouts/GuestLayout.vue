<template>
  <v-main class="primary">
    <v-container fluid fill-height>
      <router-view />
    </v-container>

    {/* Footer */}
    <v-footer app color="primary" dark>
      <span>{{ name }}</span>
      <v-spacer />
    </v-footer>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "GuestLayout",
  computed: {
    // Map state from application module (Vuex)
    ...mapState("application", {
      name: state => state.name
    })
  }
};
</script>

<style scoped></style>
