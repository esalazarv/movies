import Vue from "vue";
import VueRouter from "vue-router";

import Authenticated from "@/router/guards/Authenticated";
import auth from "./auth";
import home from "./home";

Vue.use(VueRouter);

const routes = [...auth, ...home];

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
