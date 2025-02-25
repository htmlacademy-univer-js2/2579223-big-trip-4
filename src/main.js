import DestinationModel from './model/destination-model';
import OffersModel from './model/offers-model';
import WaypointsModel from './model/waypoints-model';
import BoardPresenter from './presenter/main-presenter';
import MockService from './service/mock-service';

const siteMainElement = document.querySelector('.page-body');
const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offersModel = new OffersModel(mockService);
const waypointsModel = new WaypointsModel(mockService);

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  destinationModel: destinationModel,
  offersModel: offersModel,
  waypointsModel: waypointsModel,
});
boardPresenter.init();
