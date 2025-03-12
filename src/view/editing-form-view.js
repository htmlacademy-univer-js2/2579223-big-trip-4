import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEditingFormTemplate(waypoint, waypointDestination, waypointOffers, waypointDestinations) {
  const { basePrice, dateFrom, dateTo, offers, type } = waypoint;
  const { description, name, pictures } = waypointDestination;

  const startDate = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const endDate = dayjs(dateTo).format('DD/MM/YY HH:mm');

  const formattedDuration = `${(dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)))).hours()}ч ${(dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)))).minutes()}м`;

  const offersTemplate = waypointOffers
    .map((offer) => {
      const isChecked = offers.includes(offer.id) ? 'checked' : '';
      return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" data-offer-id="${offer.id}" ${isChecked}>
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
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant']
    .map(
      (eventType) => `
                    <div class="event__type-item">
                      <input id="event-type-${eventType}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
                      <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
                    </div>
                  `
    )
    .join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination-1" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${waypointDestinations.map((city) => `<option value="${city.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
            <span class="event__duration">(${formattedDuration})</span>
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${
  offersTemplate
    ? `<section class="event__section event__section--offers">
                  <h3 class="event__section-title event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">${offersTemplate}</div>
                </section>`
    : ''
}

          ${
  description
    ? `<section class="event__section event__section--destination">
                  <h3 class="event__section-title event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${description}</p>
                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${picturesTemplate}
                    </div>
                  </div>
                </section>`
    : ''
}
        </section>
      </form>
    </li>`;
}

export default class EditingFormView extends AbstractStatefulView {
  #waypointDestinations = null;
  #offersModel = null;
  #onResetClick = null;
  #onSubmitClick = null;

  constructor(waypoint, waypointDestination, waypointOffers, onResetClick, onSubmitClick, waypointDestinations, offersModel) {
    super();
    this.#onResetClick = onResetClick;
    this.#onSubmitClick = onSubmitClick;
    this.#waypointDestinations = waypointDestinations;
    this.#offersModel = offersModel;

    this._setState({
      waypoint,
      waypointDestination,
      waypointOffers
    });

    this._restoreHandlers();
  }

  get template() {
    return createEditingFormTemplate(
      this._state.waypoint,
      this._state.waypointDestination,
      this._state.waypointOffers,
      this.#waypointDestinations
    );
  }

  reset = (waypoint) => {
    this.updateElement({
      waypoint,
      waypointOffers: this.#getOffersByType(waypoint.type),
    });
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetButtonClickHandler);

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelectorAll('.event__type-input').forEach((input) =>
      input.addEventListener('change', this.#eventTypeChangeHandler)
    );

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) =>
      input.addEventListener('change', this.#offerChangeHandler)
    );

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setDatePickers();
  }

  #getOffersByType(type) {
    return this.#offersModel.getByType(type);
  }

  #eventTypeChangeHandler = (evt) => {
    const newType = evt.target.value;

    this.updateElement({
      waypoint: {
        ...this._state.waypoint,
        type: newType,
        offers: []
      },
      waypointOffers: this.#getOffersByType(newType)
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#waypointDestinations.find(
      (waypointDestination) => waypointDestination.name === evt.target.value
    );

    if (!selectedDestination) {
      return;
    }

    this.updateElement({
      waypoint: {
        ...this._state.waypoint,
        destination: selectedDestination.id,
      },
      waypointDestination: selectedDestination,
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      waypoint: {
        ...this._state.waypoint,
        offers: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      waypoint: {
        ...this._state.waypoint,
        basePrice: evt.target.valueAsNumber
      }
    });
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const updatedWaypoint = {
      ...this._state.waypoint,
      basePrice: Number(this.element.querySelector('.event__input--price').value),
      destination: this._state.waypointDestination.id,
      dateFrom: this._state.waypoint.dateFrom,
      dateTo: this._state.waypoint.dateTo,
    };

    this.#onSubmitClick(updatedWaypoint);
  };

  #setDatePickers() {
    const dateFromInput = this.element.querySelector('#event-start-time-1');
    const dateToInput = this.element.querySelector('#event-end-time-1');

    flatpickr(dateFromInput, {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.waypoint.dateFrom,
      onClose: this.#dateFromChangeHandler,
    });

    flatpickr(dateToInput, {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.waypoint.dateTo,
      onClose: this.#dateToChangeHandler,
    });
  }

  #dateFromChangeHandler = ([selectedDate]) => {
    const newDateFrom = selectedDate.toISOString();
    let newDateTo = this._state.waypoint.dateTo;

    if (dayjs(newDateTo).isBefore(newDateFrom)) {
      newDateTo = newDateFrom;
    }

    this._setState({
      waypoint: {
        ...this._state.waypoint,
        dateFrom: newDateFrom,
        dateTo: newDateTo,
      },
    });

    this.#updateDateToPicker();
  };

  #dateToChangeHandler = ([selectedDate]) => {
    const newDateTo = selectedDate.toISOString();

    if (dayjs(newDateTo).isBefore(this._state.waypoint.dateFrom)) {
      return;
    }

    this._setState({
      waypoint: {
        ...this._state.waypoint,
        dateTo: newDateTo,
      },
    });
  };

  #updateDateToPicker() {
    const dateToInput = this.element.querySelector('#event-end-time-1');
    flatpickr(dateToInput, {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.waypoint.dateTo,
      minDate: this._state.waypoint.dateFrom,
      onClose: this.#dateToChangeHandler,
    });
  }
}
