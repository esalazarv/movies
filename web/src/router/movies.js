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
  },
  {
    path: "/movies/:id",
    name: "movies:edit",
    component: () => import("../views/movies/MovieEdit.vue")
  }
];
