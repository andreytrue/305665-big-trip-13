import AbstractView from "./abstract.js";
import {MenuItem} from "../utils/const.js";

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">Stats</a>
  </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn`) && !evt.target.classList.contains(`trip-tabs__btn--active`)) {
      evt.preventDefault();
      this._callback.menuClick(evt.target.textContent);
      this.setMenuItem(evt.target.textContent);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-value=${menuItem}]`);
    const prevItem = this.getElement().querySelector(`.trip-tabs__btn--active`);

    if (item !== null && prevItem !== null) {
      item.classList.add(`trip-tabs__btn--active`);
      prevItem.classList.remove(`trip-tabs__btn--active`);
    }
  }
}
