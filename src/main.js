import BoardPresenter from "./presenter/main-presenter";

const siteMainElement = document.querySelector(".page-body");
/*const siteHeaderElement = siteMainElement.querySelector(".trip-main");
const tripEvents = document.querySelector(".trip-events");

render(new TripInfoView(), siteHeaderElement);
render(new FiltersView(), siteHeaderElement);
render(new NewEventButtonView(), siteHeaderElement);
render(new SortingView(), tripEvents);

tripEvents.innerHTML += `<ul class="trip-events__list"></ul>`;
const tripEventsList = tripEvents.querySelector(".trip-events__list");

render(new CreatingFormView(), tripEventsList);
render(new EditingFormView(), tripEventsList);
render(new WaypointView(), tripEventsList);*/

const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement });
boardPresenter.init();
