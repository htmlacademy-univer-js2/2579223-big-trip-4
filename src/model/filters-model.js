import Observable from '../framework/observable';
import { FilterType } from '../mock/const';

export default class FiltersModel extends Observable {
  #currentFilter = FilterType.EVERYTHING;

  get filter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
