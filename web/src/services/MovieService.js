import Service from "@/services/Service";

export default class MovieService extends Service {
  search(query = {}) {
    console.log(`[MovieService]: fetching movie list`);
    return this.client.get("movies", query);
  }

  update(id, data, params = {}) {
    return this.client.patch(`movies/${id}`, data, { params });
  }

  delete(id) {
    console.log(`[MovieService]: deleting movie`);
    return this.client.delete(`movies/${id}`);
  }
}
