import Vue from "vue";
import VueRouter from "vue-router";

import Authenticated from "@/router/guards/Authenticated";
import auth from "./auth";
import home from "./home";
import movies from "./movies";

Vue.use(VueRouter);

const routes = [...auth, ...home, ...movies];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * Global Before Middleware
 */
const BeforeMiddleware = [Authenticated];
BeforeMiddleware.forEach(middleware => router.beforeEach(middleware));

export default router;
