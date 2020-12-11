import Service from "./Service";
import config from "@/config";

export default class SanctumService extends Service {
  /**
   * This is for use different API connections
   * Custom config
   * @return {*}
   */
  _config() {
    console.log("[SanctumService]: connection config");
    return config.api.connections.sanctum;
  }

  /**
   * Get Sanctum CSRF Cookie
   * @returns Promise
   */
  getCSRFCookie() {
    console.log(`[SanctumService]: sending authentication request`);
    return this.client.get("csrf-cookie");
  }
}
