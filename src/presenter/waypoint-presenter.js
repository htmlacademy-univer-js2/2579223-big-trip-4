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
  #onDataChange = null;

  constructor(waypoint, waypointContainer, destinationsModel, offersModel, onDataChange) {
    this.#waypoint = waypoint;
    this.#waypointsContainer = waypointContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
  }

  #replaceWaypointToForm() {
    replace(this.#editWaypointComponent, this.#waypointComponent);
  }

  #replaceFormToWaypoint() {
    replace(this.#waypointComponent, this.#editWaypointComponent);
  }

  #escKeydownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToWaypoint();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #waypointEditClickHandler = () => {
    this.#replaceWaypointToForm();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #resetButtonClickHandler = () => {
    this.#replaceFormToWaypoint();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #waypointSubmitHandler = () => {
    this.#replaceFormToWaypoint();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #favoriteClickHandler = () => {
    const updatedWaypoint = {
      ...this.#waypoint,
      isFavorite: !this.#waypoint.isFavorite,
    };
    this.#onDataChange(updatedWaypoint);
  };

  init() {
    this.#waypointComponent = new WaypointView(
      this.#waypoint,
      this.#destinationsModel.getById(this.#waypoint.destination),
      this.#offersModel.getByType(this.#waypoint.type),
      this.#waypointEditClickHandler,
      this.#favoriteClickHandler
    );

    this.#editWaypointComponent = new EditingFormView(
      this.#waypoint,
      this.#destinationsModel.getById(this.#waypoint.destination),
      this.#offersModel.getByType(this.#waypoint.type),
      this.#resetButtonClickHandler,
      this.#waypointSubmitHandler
    );

    render(this.#waypointComponent, this.#waypointsContainer);
  }

  update(updatedWaypoint) {
    this.#waypoint = updatedWaypoint;
    const newWaypointComponent = new WaypointView(
      this.#waypoint,
      this.#destinationsModel.getById(this.#waypoint.destination),
      this.#offersModel.getByType(this.#waypoint.type),
      this.#waypointEditClickHandler,
      this.#favoriteClickHandler
    );

    replace(newWaypointComponent, this.#waypointComponent);
    this.#waypointComponent = newWaypointComponent;
  }
}
