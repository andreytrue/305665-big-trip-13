import AbstractView from "./abstract.js";

const createInfoTemplate = (points) => {
  const citiesList = points.map(function (point) {
    return point.city;
  });

  const cities = new Set(citiesList);
  const uniqCities = Array.from(cities);

  const tripInfo = uniqCities.reduce((prev, curr) => {
    return prev + ` &mdash; ` + curr;
  });

  const dateStart = points[0].date.start.format(`MMM DD`);
  const dateFinish = points[0].date.start.format(`MMM`) === points[points.length - 1].date.finish.format(`MMM`)
    ? points[points.length - 1].date.finish.format(`DD`)
    : points[points.length - 1].date.finish.format(`MMM DD`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo}</h1>

      <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateFinish}</p>
    </div>
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
