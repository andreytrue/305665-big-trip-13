import dayjs from 'dayjs';

export const KeyItem = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

export const SortType = {
  DEFAULT: `sort-day`,
  PRICE: `sort-price`,
  TIME: `sort-time`,
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};

export const BAR_HEIGHT = 55;

export const newPoint = {
  type: `Taxi`,
  price: `0`,
  offers: [],
  destination: {},
  date: {
    start: dayjs(),
    finish: dayjs(),
  },
  isFavorite: false,
};
