import Service from "@/services/Service";

export default class ScheduleService extends Service {
  search(query) {
    console.log(`[ScheduleService]: fetching movie schedules`);
    return this.client.get(`schedules`, query);
  }

  create(data) {
    console.log(`[ScheduleService]: creating movie schedules`);
    return this.client.post(`schedules`, data);
  }

  update(id, data) {
    console.log(`[ScheduleService]: updating movie schedules`);
    return this.client.patch(`schedules/${id}`, data);
  }
  delete(id) {
    console.log(`[ScheduleService]: deleting movie schedules`);
    return this.client.delete(`schedules/${id}`);
  }
}
