import { render } from '../framework/render';
import NewEventButtonView from '../view/new-event-button-view';

export default class NewEventButtonPresenter {
  #boardContainer = null;
  #headerElement = null;

  constructor({ boardContainer }) {
    this.#boardContainer = boardContainer;
    this.#headerElement = this.#boardContainer.querySelector('.trip-main');
  }

  init() {
    render(new NewEventButtonView(), this.#headerElement);
  }
}
