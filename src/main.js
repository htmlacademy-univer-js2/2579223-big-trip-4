import DestinationModel from './model/destination-model';
import OffersModel from './model/offers-model';
import WaypointsModel from './model/waypoints-model';
import BoardPresenter from './presenter/main-presenter';
import MockService from './service/mock-service';
import FiltersPresenter from './presenter/filter-presenter';
import NewEventButtonPresenter from './presenter/new-event-btn-presenter';
import FiltersModel from './model/filters-model';

const siteMainElement = document.querySelector('.page-body');
const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offersModel = new OffersModel(mockService);
const waypointsModel = new WaypointsModel(mockService);
const filtersModel = new FiltersModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  destinationModel: destinationModel,
  offersModel: offersModel,
  waypointsModel: waypointsModel,
  filtersModel: filtersModel,
});

const filtersPresenter = new FiltersPresenter({
  boardContainer: siteMainElement,
  filtersModel: filtersModel,
});

const newEventButtonPresenter = new NewEventButtonPresenter({
  boardContainer: siteMainElement,
});

boardPresenter.init();
filtersPresenter.init();
newEventButtonPresenter.init();
