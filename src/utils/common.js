import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const addZeroToNumber = (number) => {
  return (number < 10 ? `0${number}` : number);
};

export const getEventDuration = (startDate, endDate) => {
  const diffInTime = endDate.diff(startDate);
  const timeDuration = dayjs.duration(diffInTime);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();

  return `
    ${(days > 0 && addZeroToNumber(days) + `D`) || ``}
    ${((days > 0 || hours > 0) && addZeroToNumber(hours) + `H`) || ``}
    ${addZeroToNumber(minutes)}M`;
};

export const sortWaypointsByTime = (itemsA, itemsB) => {
  const timeDurationItemsA = itemsA.dateEnd.diff(itemsA.dateStart, `m`);
  const timeDurationItemsB = itemsB.dateEnd.diff(itemsB.dateStart, `m`);

  if (timeDurationItemsB > timeDurationItemsA) {
    return 1;
  }
  if (timeDurationItemsB < timeDurationItemsA) {
    return -1;
  }
  return 0;
};

export const sortPrice = (prevPoint, nextPoint) => nextPoint.price - prevPoint.price;

export const sortTime = (prevPoint, nextPoint) => {
  return (nextPoint.date.finish - nextPoint.date.start) - (prevPoint.date.finish - prevPoint.date.start);
};
