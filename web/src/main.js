import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./directives";
import "./plugins/vue-debounce";
import "./plugins/vevalidate";
import vuetify from "./plugins/vuetify";
import moment from './plugins/vue-moment';
import i18n from "./plugins/i18n";

Vue.config.productionTip = false;

const files = require.context("./", true, /\.vue$/i);
files.keys().map(key =>
  Vue.component(
    key
      .split("/")
      .pop()
      .split(".")[0],
    files(key).default
  )
);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  moment,
  render: h => h(App)
}).$mount("#app");
