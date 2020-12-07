export const createInfoTemplate = (points) => {
  const citiesList = points.map(function (point) {
    return point.city;
  });

  const cities = new Set(citiesList);
  const uniqCities = Array.from(cities);

  const tripInfo = (citiesArray) => {
    let tripRoute = ``;
    for (let i = 0; i < citiesArray.length; i++) {
      tripRoute += citiesArray[i];

      if (i < citiesArray.length - 1) {
        tripRoute += ` &mdash; `;
      }
    }

    return tripRoute;
  };

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo(uniqCities)}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  </section>`;
};
