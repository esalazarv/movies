import store from "../../store";

const Authenticated = async (to, from, next) => {
  console.log(
    "[AuthenticatedGuard]: authenticated",
    store.getters["auth/authenticated"]
  );
  if (to.meta.public === true) {
    console.log("[AuthenticatedGuard]: accessing to public route " + to.path);
    return next();
  }
  if (to.name === "login" && store.getters["auth/authenticated"]) {
    console.log("[AuthenticatedGuard]: redirecting to home");
    return next({ name: "home" });
  }
  if (to.name !== "login" && !store.getters["auth/authenticated"]) {
    console.log("[AuthenticatedGuard]: redirecting to login");
    return next({ name: "login" });
  }
  if (!to.name) {
    console.log(`[AuthenticatedGuard]: accessing to route home`);
    return next({ name: "home" });
  }
  console.log(`[AuthenticatedGuard]: accessing to route ${to.name}`);
  return next();
};

export default Authenticated;
