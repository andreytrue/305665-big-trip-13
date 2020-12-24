import {createElement} from "../utils.js";

const createPriceTemplate = (points) => {
  const priceSum = points.reduce(function (sum, curr) {
    return sum + curr.price;
  }, 0);

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceSum}</span>
    </p>`;
};

export default class Price {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createPriceTemplate(this._points);
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
