import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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

export const sortPrice = (prevPoint, nextPoint) => nextPoint.price - prevPoint.price;

export const sortTime = (prevPoint, nextPoint) => {
  return (nextPoint.date.finish - nextPoint.date.start) - (prevPoint.date.finish - prevPoint.date.start);
};

export const sortDate = (prevPoint, nextPoint) => {
  if (prevPoint.date.start.isAfter(nextPoint.date.start)) {
    return 1;
  } else if (!(prevPoint.date.start.isAfter(nextPoint.date.start))) {
    return -1;
  }

  return 0;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};

export const getDurationInDays = (diffInMs) => {
  const timeDuration = dayjs.duration(diffInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();

  if (days > 0) {
    return (`${addZeroToNumber(days) + `D`} ${((hours > 0) && addZeroToNumber(hours) + `H`) || ``}`);
  } else {
    return (`${addZeroToNumber(hours) + `H`}`);
  }
};
