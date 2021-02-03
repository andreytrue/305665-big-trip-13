import AbstractView from "./abstract.js";

const createPriceTemplate = (points) => {
  const priceSum = points.reduce(function (sum, curr) {
    return sum + curr.price;
  }, 0);

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceSum}</span>
    </p>`;
};

export default class Price extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createPriceTemplate(this._points);
  }
}
