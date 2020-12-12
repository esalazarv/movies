import Service from "@/services/Service";

export default class MovieService extends Service {
  search(query = {}) {
    console.log(`[MovieService]: fetching movie list`);
    return this.client.get("movies", query);
  }

  find(id, params = {}) {
    console.log(`[MovieService]: fetching movie`);
    return this.client.get(`movies/${id}`, params);
  }

  create(data, params = {}) {
    console.log(`[MovieService]: creating movie`);
    return this.client.post(`movies`, data, { params });
  }

  update(id, data, params = {}) {
    console.log(`[MovieService]: updating movie`);
    return this.client.patch(`movies/${id}`, data, { params });
  }

  delete(id) {
    console.log(`[MovieService]: deleting movie`);
    return this.client.delete(`movies/${id}`);
  }
}
