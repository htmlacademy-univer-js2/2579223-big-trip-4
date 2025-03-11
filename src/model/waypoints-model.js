import { updateItem } from '../utils';
import Observable from '../framework/observable';

export default class WaypointsModel extends Observable {
  #service = null;
  #waypoints = null;

  constructor(service) {
    super();
    this.#service = service;
    this.#waypoints = this.#service.waypoints;
  }

  getWaypoints() {
    return this.#waypoints;
  }

  setWaypoints(newWaypoints) {
    this.#waypoints = [...newWaypoints];
    this._notify('set', this.#waypoints);
  }

  getById(id) {
    return this.#waypoints.find((waypoint) => waypoint.id === id);
  }

  update(updateType, waypoint) {
    const updatedWaypoint = this.#service.updateWaypoint(waypoint);
    this.#waypoints = updateItem(this.#waypoints, updatedWaypoint);
    this._notify(updateType, updatedWaypoint);
  }

  add(updateType, waypoint) {
    const addedWaypoint = this.#service.addWaypoint(waypoint);
    this.#waypoints.push(addedWaypoint);
    this._notify(updateType, addedWaypoint);
  }

  delete(updateType, waypoint) {
    this.#service.deleteWaypoint(waypoint);
    this.#waypoints = this.#waypoints.filter((waypointItem) => waypointItem.id !== waypoint.id);
    this._notify(updateType);
  }
}
