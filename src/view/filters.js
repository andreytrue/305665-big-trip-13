import AbstractView from "./abstract.js";

const createFiltersElement = (filter, currentFilterType) => {
  const {type, name} = filter;

  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${type === currentFilterType ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>`;
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFiltersElement(filter, currentFilterType))
    .join(``);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    </form>`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
