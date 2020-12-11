import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "../lang/en";
import es from "../lang/es";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "es", // set locale
  fallbackLocale: "en",
  messages: { en, es } // set available locales
});

export default i18n;
