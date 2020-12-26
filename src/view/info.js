import {createElement} from "../utils.js";

const createInfoTemplate = (points) => {
  const citiesList = points.map(function (point) {
    return point.city;
  });

  const cities = new Set(citiesList);
  const uniqCities = Array.from(cities);

  const tripInfo = uniqCities.reduce(function (prev, curr) {
    return prev + ` &mdash; ` + curr;
  });

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  </section>`;
};

export default class Info {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
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
