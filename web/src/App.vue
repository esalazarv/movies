<template>
  <v-app id="app">
    <component :is="layout"></component>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    // Map state from application module (Vuex)
    ...mapState("application", {
      layout: state => state.layout
    }),

    // Map getters from auth module (Vuex)
    ...mapGetters("auth", ["authenticated"])
  },
  components: {},

  data: () => ({
    //
  }),

  watch: {
    /**
     * Listen changes for computed property "authenticated" mapped from auth getters (Vuex)
     * if user is not authenticated then redirect to login view
     * @param newValue
     */
    authenticated(newValue) {
      if (!newValue) {
        console.log("[App]: redirecting to login");
        this.$router.push({ name: "login" });
      }
    }
  },
  mounted() {
    // Init things here
    console.log("[App]: mounted");
  }
};
</script>
