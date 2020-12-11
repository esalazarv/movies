<template>
  <v-main class="main-bg">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
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
              v-if="child.isVisible && child.isVisible()"
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
          <v-list-item v-else-if="item.isVisible()" :key="item.text" link @click="item.action()">
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
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
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
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="32px" item>
              <v-img :src="user.avatar.url" alt="Vuetify"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-subheader>
            <v-avatar size="25px" item class="mr-2">
              <v-img :src="user.avatar.url" alt="Vuetify"></v-img>
            </v-avatar>
            <v-list-item three-line>
              <v-list-item-content class="pb-16 pt-16">
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-subheader>
          <v-divider></v-divider>
          <v-list-item @click="logout">
            <v-list-item-title><v-icon>fa fa-power-off</v-icon> Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view></router-view>
  </v-main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'AppLayout',
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    // Map getters from auth module (Vuex)
    ...mapGetters("auth", ["user"]),

    items() {
      return [
        {
          icon: 'fa fa-chart-bar',
          text: 'Dashboard',
          action: () => this.$router.push({ name: 'home' }),
          isVisible: () => true,
        },
        {
          icon: 'fa fa-film',
          text: 'Peliculas',
          action: () => this.$router.push({ name: 'home' }),
          isVisible: () => true,
        },
        {
          icon: 'fa fa-calendar-alt',
          text: 'Turnos',
          action: () => this.$router.push({ name: 'home' }),
          isVisible: () => true,
        },
        {
          icon: 'fa fa-users-cog',
          text: 'Administradores',
          action: () => this.$router.push({ name: 'home' }),
          isVisible: () => true,
        },
      ];
    },
  },
  methods: {
    // Map actions from auth module (Vuex)
    ...mapActions('auth', ['logout']),
  },
};
</script>

<style scoped>
.logo {
  height: 30px;
}
.main-bg {
  background: #f6f7ff;
}
</style>
