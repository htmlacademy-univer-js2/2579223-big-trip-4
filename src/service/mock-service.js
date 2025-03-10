import {
  DESTINATIONS_COUNT,
  EVENTS_TYPES,
  OFFERS_COUNT,
  WAYPOINTS_COUNT,
} from '../mock/const';
import { generateDestination } from '../mock/destination';
import { generateOffer } from '../mock/offer';
import { generateWaypoint } from '../mock/waypoints';
import { getRandomArrayElement, getRandomInteger } from '../utils';

export default class MockService {
  #destinations = null;
  #offers = null;
  #waypoints = null;

  constructor() {
    this.#destinations = this.generateDestinations();
    this.#offers = this.generateOffers();
    this.#waypoints = this.generateWaypoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get waypoints() {
    return this.#waypoints;
  }

  generateOffers() {
    return EVENTS_TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(0, OFFERS_COUNT) }, () =>
        generateOffer(type)
      ),
    }));
  }

  generateDestinations() {
    return Array.from({ length: DESTINATIONS_COUNT }, () =>
      generateDestination()
    );
  }

  generateWaypoints() {
    return Array.from({ length: WAYPOINTS_COUNT }, () => {
      const type = getRandomArrayElement(EVENTS_TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const hasOffers = getRandomInteger(0, 1);

      const offersByType = this.#offers.find(
        (offerByType) => offerByType.type === type
      );

      const offerIds = hasOffers
        ? offersByType.offers
          .slice(0, getRandomInteger(1, OFFERS_COUNT))
          .map((offer) => offer.id)
        : [];

      return generateWaypoint(type, destination.id, offerIds);
    });
  }

  updateWaypoint(updatedWaypoint) {
    return updatedWaypoint;
    // to do
  }

  addWaypoint(data) {
    return {...data, id: crypto.randomUUID()};
    // to do
  }

  deleteWaypoint() {
    // to do
  }
}
