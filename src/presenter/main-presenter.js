import { render } from '../framework/render';
// import CreatingFormView from '../view/create-form-view';
import FiltersView from '../view/filters-view';
import NewEventButtonView from '../view/new-event-button-view';
import SortingView from '../view/sorting-view';
import TripInfoView from '../view/trip-info-view';
import WaypointPresenter from './waypoint-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #waypointsModel = null;
  #headerElement = null;
  #tripEvents = null;
  #tripEventsList = null;
  #waypointPresenters = new Map();

  constructor({ boardContainer, destinationModel, offersModel, waypointsModel }) {
    this.#boardContainer = boardContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#headerElement = this.#boardContainer.querySelector('.trip-main');
    this.#tripEvents = this.#boardContainer.querySelector('.trip-events');
    this.#tripEventsList = null;
  }

  get waypoints() {
    return this.#waypointsModel.waypoints;
  }

  init() {
    render(new TripInfoView(), this.#headerElement);
    render(new FiltersView(), this.#headerElement);
    render(new NewEventButtonView(), this.#headerElement);
    render(new SortingView(), this.#tripEvents);

    this.#tripEvents.innerHTML += '<ul class="trip-events__list"></ul>';
    this.#tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    // render(new CreatingFormView(), this.#tripEventsList);

    this.#waypointsModel.waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(
      waypoint,
      this.#tripEventsList,
      this.#destinationModel,
      this.#offersModel,
      this.#handleWaypointChange,
      this.#handleModeChange
    );

    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
    waypointPresenter.init();
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypointsModel.updateWaypoint(updatedWaypoint);
    const waypointPresenter = this.#waypointPresenters.get(updatedWaypoint.id);
    if (waypointPresenter) {
      waypointPresenter.update(updatedWaypoint);
    }
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((waypointPresenter) => waypointPresenter.resetView());
  };
}
