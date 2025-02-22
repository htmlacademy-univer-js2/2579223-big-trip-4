export default class WaypointsModel {
  #service;
  #waypoints;

  constructor(service) {
    this.#service = service;
    this.#waypoints = this.#service.waypoints;
  }

  get waypoints() {
    return this.#waypoints;
  }
}
