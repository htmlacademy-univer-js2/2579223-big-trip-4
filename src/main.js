import { render } from "./render";
import CreatingFormView from "./view/create-form-view";
import EditingFormView from "./view/editing-form-view";
import FiltersView from "./view/filters-view";
import NewEventButtonView from "./view/new-event-button-view";
import SortingView from "./view/sorting-view";
import TripInfoView from "./view/trip-info-view";
import WaypointView from "./view/waypoint-view";

const siteMainElement = document.querySelector(".page-body");
const siteHeaderElement = siteMainElement.querySelector(".trip-main");
const tripEvents = document.querySelector(".trip-events");

render(new TripInfoView(), siteHeaderElement);
render(new FiltersView(), siteHeaderElement);
render(new NewEventButtonView(), siteHeaderElement);
render(new SortingView(), tripEvents);

tripEvents.innerHTML += `<ul class="trip-events__list"></ul>`;
const tripEventsList = tripEvents.querySelector(".trip-events__list");

render(new CreatingFormView(), tripEventsList);
render(new EditingFormView(), tripEventsList);
render(new WaypointView(), tripEventsList);
