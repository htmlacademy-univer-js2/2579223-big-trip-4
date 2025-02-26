export default class WaypointsModel {
  #service = null;
  #waypoints = null;

  constructor(service) {
    this.#service = service;
    this.#waypoints = this.#service.waypoints;
  }

  get waypoints() {
    return this.#waypoints;
  }

  updateWaypoint(updatedWaypoint) {
    return this.#waypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);
  }
}
