import {createElement} from "../utils.js";

const createFormListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class FormList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFormListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
