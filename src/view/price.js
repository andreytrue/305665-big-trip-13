export const createPriceTemplate = (points) => {
  let priceSum = 0;

  for (let i = 0; i < points.length; i++) {
    priceSum += points[i].price;
  }

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceSum}</span>
    </p>`;
};
