import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

function createEditingFormTemplate(
  waypoint,
  waypointDestination,
  waypointOffers
) {
  const { basePrice, dateFrom, dateTo, offers, type } = waypoint;
  const { description, name, pictures } = waypointDestination;

  const startDate = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const endDate = dayjs(dateTo).format('DD/MM/YY HH:mm');

  const offersTemplate = waypointOffers
    .map((offer) => {
      const isChecked = offers.includes(offer.id) ? 'checked' : '';
      return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`;
    })
    .join('');

  const picturesTemplate = pictures.length
    ? pictures
      .map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)
      .join('')
    : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${
  offersTemplate
    ? `
              <section class="event__section event__section--offers">
                <h3 class="event__section-title event__section-title--offers">Offers</h3>
                <div class="event__available-offers">${offersTemplate}</div>
              </section>
              `
    : ''
}

          ${
  description
    ? `
              <section class="event__section event__section--destination">
                <h3 class="event__section-title event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${picturesTemplate}
                  </div>
                </div>
              </section>
              `
    : ''
}
        </section>
      </form>
    </li>`;
}

export default class EditingFormView extends AbstractView {
  constructor(waypoint, waypointDestination, waypointOffers) {
    super();
    this.waypoint = waypoint;
    this.waypointDestination = waypointDestination;
    this.waypointOffers = waypointOffers;
  }

  get template() {
    return createEditingFormTemplate(
      this.waypoint,
      this.waypointDestination,
      this.waypointOffers
    );
  }
}
