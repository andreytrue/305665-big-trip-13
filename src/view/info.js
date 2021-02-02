import AbstractView from "./abstract.js";

const createPriceTemplate = (points) => {
  let totalSum = 0;

  if (points.length) {
    const totalPrice = points.reduce((acc, point) => acc + +point.price, 0);

    const totalOffersPrice = points
      .reduce((acc1, {offers}) => acc1 + offers
      .reduce((acc, {price}) => acc + +price, 0), 0);

    totalSum = totalPrice + totalOffersPrice;
  }
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
    </p>`
  );
};

const createRouteTemplate = (points) => {
  return points.length > 3
    ? `${points[0].destination.city} &mdash; ... &mdash; ${points[points.length - 1].destination.city}`
    : points.map(({destination: {city}}) => `${city} &mdash;`).join(` `).slice(0, -7);
};

const createInfoTemplate = (points) => {
  const tripInfo = createRouteTemplate(points);

  const dateStart = points[0].date.start.format(`MMM DD`);
  const dateFinish = points[0].date.start.format(`MMM`) === points[points.length - 1].date.finish.format(`MMM`)
    ? points[points.length - 1].date.finish.format(`DD`)
    : points[points.length - 1].date.finish.format(`MMM DD`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo}</h1>

      <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateFinish}</p>
    </div>
    ${createPriceTemplate(points)}
  </section>`;
};

export default class Info extends AbstractView {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}
