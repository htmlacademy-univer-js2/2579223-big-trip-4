export default class DestinationModel {
  #service;
  #destinations;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.destinations;
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
