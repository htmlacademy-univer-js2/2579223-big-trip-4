import { render, replace, remove } from '../framework/render';
import EditingFormView from '../view/editing-form-view';
import WaypointView from '../view/waypoint-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class WaypointPresenter {
  #waypointsContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #waypoint = null;
  #waypointComponent = null;
  #editWaypointComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(waypoint, waypointContainer, destinationsModel, offersModel, onDataChange, onModeChange) {
    this.#waypoint = waypoint;
    this.#waypointsContainer = waypointContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  #replaceWaypointToForm() {
    replace(this.#editWaypointComponent, this.#waypointComponent);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToWaypoint() {
    replace(this.#waypointComponent, this.#editWaypointComponent);
    this.#mode = Mode.DEFAULT;
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
    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#editWaypointComponent;

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

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editWaypointComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
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

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editWaypointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToWaypoint();
    }
  }
}
