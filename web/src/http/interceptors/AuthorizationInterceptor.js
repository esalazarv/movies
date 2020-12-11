import store from "../../store";

const AuthorizationInterceptor = async config => {
  console.log(
    "[AuthorizationInterceptor] has token:",
    store.getters["auth/authenticated"]
  );
  const type = store.state.auth.access.token_type;
  const token = store.state.auth.access.access_token;
  config.headers.Authorization = `${type} ${token}`;
  return config;
};

export default AuthorizationInterceptor;
