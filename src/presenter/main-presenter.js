import { render } from "../render";
import CreatingFormView from "../view/create-form-view";
import EditingFormView from "../view/editing-form-view";
import FiltersView from "../view/filters-view";
import NewEventButtonView from "../view/new-event-button-view";
import SortingView from "../view/sorting-view";
import TripInfoView from "../view/trip-info-view";
import WaypointView from "../view/waypoint-view";

export default class BoardPresenter {
  constructor({
    boardContainer,
    destinationModel,
    offersModel,
    waypointsModel,
  }) {
    this.boardContainer = boardContainer;
    this.destinationData = destinationModel.get();
    this.offersData = offersModel.get();
    this.waypointsData = waypointsModel.get();
  }

  init() {
    const headerElement = this.boardContainer.querySelector(".trip-main");
    const tripEvents = this.boardContainer.querySelector(".trip-events");

    render(new TripInfoView(), headerElement);
    render(new FiltersView(), headerElement);
    render(new NewEventButtonView(), headerElement);
    render(new SortingView(), tripEvents);

    tripEvents.innerHTML += `<ul class="trip-events__list"></ul>`;
    const tripEventsList = tripEvents.querySelector(".trip-events__list");

    render(new EditingFormView(), tripEventsList);
    render(new CreatingFormView(), tripEventsList);
    this.waypointsData.forEach((waypoint) => {
      render(new WaypointView(waypoint), tripEventsList);
    });
  }
}
