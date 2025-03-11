import { render } from '../framework/render';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  #boardContainer = null;
  #headerElement = null;

  constructor({ boardContainer }) {
    this.#boardContainer = boardContainer;
    this.#headerElement = this.#boardContainer.querySelector('.trip-main');
  }

  init() {
    render(new FiltersView(), this.#headerElement);
  }
}
