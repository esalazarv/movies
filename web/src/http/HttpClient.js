import { AxiosResponse } from "axios";
import AxiosBuilder from "./AxiosBuilder";

class HttpClient {
  http;

  /**
   * @param config {AxiosRequestConfig}
   */
  constructor(config = {}) {
    this.http = AxiosBuilder.build(config);
  }

  /**
   * Apply an interceptor before send request
   * @param handler
   */
  applyInterceptorRequest(handler) {
    this.http.interceptors.request.use(handler);
  }

  /**
   * Apply an interceptor after endpoint response
   * @param handler
   */
  applyInterceptorResponse(handler) {
    this.http.interceptors.response.use(handler);
  }

  /**
   * Make a GET request
   * @param url
   * @param params
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<AxiosResponse<T> | never>}
   */
  get(url, params = {}, conf = {}) {
    return this.http
      .get(url, { ...conf, params })
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a POST request
   * @param url
   * @param data
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<AxiosResponse<T> | never>}
   */
  post(url, data = {}, conf = {}) {
    return this.http
      .post(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a PUT request
   * @param url
   * @param data
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<AxiosResponse<T> | never>}
   */
  put(url, data = {}, conf = {}) {
    return this.http
      .put(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a PATCH request
   * @param url
   * @param data
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<AxiosResponse<T> | never>}
   */
  patch(url, data = {}, conf = {}) {
    return this.http
      .patch(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a DELETE request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<AxiosResponse<T> | never>}
   */
  delete(url, conf = {}) {
    return this.http
      .delete(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a HEAD request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<AxiosResponse<T> | never>}
   */
  head(url, conf = {}) {
    return this.http
      .head(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a OPTIONS request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<T | never>}
   */
  options(url, conf = {}) {
    return this.http
      .options(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }
}

export default HttpClient;
