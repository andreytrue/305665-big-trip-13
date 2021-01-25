import dayjs from 'dayjs';
import {FilterType} from "../utils/const.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointExpired(point.date.start)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInFuture(point.date.start)),
};

export const isPointExpired = (date) => {
  return date === null ? false : dayjs().isBefore(date, `D`);
};

export const isPointInFuture = (date) => {
  return date === null ? false : dayjs().isAfter(date, `D`);
};
