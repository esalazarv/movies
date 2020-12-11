export default [
  {
    path: "/movies",
    name: "movies",
    component: () => import("../views/movies/MovieList.vue")
  },
  {
    path: "/movies/create",
    name: "movies:create",
    component: () => import("../views/movies/MovieCreate.vue")
  }
];
