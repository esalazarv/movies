import Service from "./Service";

export default class AuthService extends Service {
  /**
   *
   * @param credentials
   * @returns Promise
   */
  authenticate(credentials) {
    console.log(`[AuthService]: sending authentication request`);
    return this.client.post("login", credentials);
  }

  me() {
    console.log(`[AuthService]: get authenticated user`);
    return this.client.get("me");
  }
}
