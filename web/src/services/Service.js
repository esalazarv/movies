import HttpClient from "../http/HttpClient";
import AuthorizationInterceptor from "../http/interceptors/AuthorizationInterceptor";
import config from "../config";

export default class Service {
  /**
   * @var HttpClient
   * */
  client;

  /**
   * Request interceptors
   * @type {{authorization: function(*): Promise<*>}}
   */
  static defaultInterceptors = {
    authorization: AuthorizationInterceptor
  };

  constructor() {
    if (this.constructor.name === Service.name) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this._setHttpClient();
    this._applyInterceptors();
  }

  /**
   * Initialize HttpClient
   */
  _setHttpClient() {
    this.client = Service.buildHttpClient(this._config());
  }

  /**
   * Resolve config
   * @return {*}
   */
  _config() {
    console.log("[Service]: connection", config.api.default);
    return config.api.connections[config.api.default];
  }

  /**
   * Add request interceptors
   * overwrite in child classes
   * @return {{}}
   * @private
   */
  _interceptors() {
    return {};
  }

  /**
   * Build HttpClient
   * @param config
   * @returns {HttpClient}
   */
  static buildHttpClient(config = {}) {
    return new HttpClient(config);
  }

  /**
   * Merge default interceptors with instance interceptors
   * @returns {[]}
   */
  _getInterceptors() {
    const interceptors = {
      ...Service.defaultInterceptors,
      ...this._interceptors()
    };
    return Object.keys(interceptors).map(key => interceptors[key]);
  }

  /**
   * Apply interceptors before each request
   * @private
   */
  _applyInterceptors() {
    this._getInterceptors().map(middleware => {
      this.client.applyInterceptorRequest(middleware);
    });
  }
}
