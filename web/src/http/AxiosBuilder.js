import axios from "axios";
import config from "../config";

class AxiosBuilder {
  /**
   * Default axios configuration
   * @type {AxiosRequestConfig}
   */
  static defaultConfig = config.api.connections[config.api.default];

  /**
   * Build a new Instance of axios
   * @param options
   * @returns {AxiosInstance}
   */
  static build(options = {}) {
    return axios.create({ ...AxiosBuilder.defaultConfig, ...options });
  }
}

export default AxiosBuilder;
