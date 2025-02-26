import { render, replace } from '../framework/render';
import EditingFormView from '../view/editing-form-view';
import WaypointView from '../view/waypoint-view';

export default class WaypointPresenter {
  #waypointsContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #waypoint = null;
  #waypointComponent = null;
  #editWaypointComponent = null;

  constructor(waypoint, waypointContainer, destinationsModel, offersModel) {
    this.#waypoint = waypoint;
    this.#waypointsContainer = waypointContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  #replaceWaypointToForm() {
    replace(this.#editWaypointComponent, this.#waypointComponent);
  }

  #replaceFormToWaypoint() {
    replace(this.#waypointComponent, this.#editWaypointComponent);
  }

  escKeydownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToWaypoint();
      document.removeEventListener('keydown', this.escKeydownHandler);
    }
  };

  #waypointEditClickHandler() {
    this.#replaceWaypointToForm();
    document.addEventListener('keydown', this.escKeydownHandler);
  }

  #resetButtonClickHandler() {
    this.#replaceFormToWaypoint();
    document.removeEventListener('keydown', this.escKeydownHandler);
  }

  #waypointSubmitHandler() {
    this.#replaceFormToWaypoint();
    document.removeEventListener('keydown', this.escKeydownHandler);
  }

  init() {
    this.#waypointComponent = new WaypointView(
      this.#waypoint,
      this.#destinationsModel.getById(this.#waypoint.destination),
      this.#offersModel.getByType(this.#waypoint.type),
      this.#waypointEditClickHandler.bind(this)
    );

    this.#editWaypointComponent = new EditingFormView(
      this.#waypoint,
      this.#destinationsModel.getById(this.#waypoint.destination),
      this.#offersModel.getByType(this.#waypoint.type),
      this.#resetButtonClickHandler.bind(this),
      this.#waypointSubmitHandler.bind(this)
    );

    render(this.#waypointComponent, this.#waypointsContainer);
  }
}
