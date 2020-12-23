import {createElement} from "../utils.js";

const createPriceTemplate = (points) => {
  let priceSum = 0;

  for (let i = 0; i < points.length; i++) {
    priceSum += points[i].price;
  }

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
