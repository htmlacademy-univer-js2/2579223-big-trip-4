import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import AbstractView from '../framework/view/abstract-view.js';
dayjs.extend(duration);

function createWaypointTemplate(waypoint, waypointDestination, waypointOffers) {
  const { basePrice, dateFrom, dateTo, isFavorite, offers, type } = waypoint;
  const { name } = waypointDestination;

  const eventDate = dayjs(dateFrom).format('MMM D');
  const startTime = dayjs(dateFrom).format('HH:mm');
  const endTime = dayjs(dateTo).format('HH:mm');

  const diffMs = dayjs(dateTo).diff(dayjs(dateFrom));
  const durationTime = dayjs.duration(diffMs);
  let formattedDuration = '';

  if (durationTime.days() > 0) {
    formattedDuration = `${durationTime.days()}D ${durationTime.hours()}H ${durationTime.minutes()}M`;
  } else if (durationTime.hours() > 0) {
    formattedDuration = `${durationTime.hours()}H ${durationTime.minutes()}M`;
  } else {
    formattedDuration = `${durationTime.minutes()}M`;
  }

  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  const offersList = waypointOffers
    .filter((offer) => offers.includes(offer.id))
    .map(
      (offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    )
    .join('');

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${eventDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
          </p>
          <p class="event__duration">${formattedDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${offersList}</ul>
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class WaypointView extends AbstractView {
  #waypoint = null;
  #waypointDestination = null;
  #waypointOffers = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor(waypoint, waypointDestination, waypointOffers, onEditClick, onFavoriteClick) {
    super();
    this.#waypoint = waypoint;
    this.#waypointDestination = waypointDestination;
    this.#waypointOffers = waypointOffers;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClickHandler);
  }

  get template() {
    return createWaypointTemplate(
      this.#waypoint,
      this.#waypointDestination,
      this.#waypointOffers
    );
  }

  #onEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #onFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
