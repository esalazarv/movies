<template>
  <v-main class="main-bg">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.open"
            append-icon="fa fa-chevron-down"
          >
            <template v-slot:activator>
              <v-list-item-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              @click="child.action()"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- IF Item has not children -->
          <v-list-item v-else :key="item.text" link @click="item.action()">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
        <v-img
          :src="null"
          position="left center"
          class="hidden-xs-and-down"
          contain
          height="45"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleLang" v-if="$root.$i18n.locale">
        <v-badge overlap :content="$root.$i18n.locale">
          <v-icon>fa fa-globe-americas</v-icon>
        </v-badge>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>fa fa-user-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-subheader>
            <v-icon>fa fa-user-circle</v-icon>
            <v-list-item three-line>
              <v-list-item-content class="pb-16 pt-16">
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-subheader>
          <v-divider></v-divider>
          <v-list-item @click="logout">
            <v-list-item-title
              ><v-icon>fa fa-power-off</v-icon>
              {{ $t("app.toolbar.menu.logout") }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view></router-view>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppLayout",
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    // Map getters from auth module (Vuex)
    ...mapGetters("auth", ["user"]),

    items() {
      return [
        {
          icon: "fa fa-chart-bar",
          text: this.$t("app.sidebar.dashboard"),
          action: () => this.navigate({ name: "home" })
        },
        {
          icon: "fa fa-film",
          text: this.$t("app.sidebar.movies"),
          action: () => this.navigate({ name: "movies" })
        }
        /*{
          icon: "fa fa-calendar-alt",
          text: "Turnos",
          action: () => this.navigate({ name: "home" }),
        }
        {
          icon: "fa fa-users-cog",
          text: "Administradores",
          action: () => this.navigate({ name: "home" }),
        }*/
      ];
    }
  },
  methods: {
    // Map actions from auth module (Vuex)
    ...mapActions("auth", ["logout"]),
    navigate(options) {
      if (this.$router.currentRoute.name !== options.name) {
        this.$router.push(options);
      }
    },
    toggleLang() {
      this.$root.$i18n.locale = this.$i18n.locale === 'es' ? 'en' : 'es';
    }
  }
};
</script>

<style lang="scss">
.v-icon.v-icon,
.v-btn > .v-btn__content .v-icon {
  font-size: 16px;
}
.logo {
  height: 30px;
}
.main-bg {
  background: #f6f7ff;
}
</style>
