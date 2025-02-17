export default class WaypointsModel {
  constructor(service) {
    this.service = service;
    this.waypoints = this.service.getWaypoints();
  }

  get() {
    return this.waypoints;
  }
}
