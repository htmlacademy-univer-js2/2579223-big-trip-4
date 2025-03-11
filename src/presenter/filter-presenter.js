import { render } from '../framework/render';
import FiltersView from '../view/filters-view';
import { UpdateType } from '../mock/const';

export default class FiltersPresenter {
  #boardContainer = null;
  #filtersModel = null;

  constructor({ boardContainer, filtersModel }) {
    this.#boardContainer = boardContainer;
    this.#filtersModel = filtersModel;
  }

  init() {
    render(new FiltersView(this.#handleFilterChange), this.#boardContainer.querySelector('.trip-main'));
  }

  #handleFilterChange = (filter) => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, filter);
  };
}
