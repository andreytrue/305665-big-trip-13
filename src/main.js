import {createInfoTemplate} from "./view/info.js";
import {createPriceTemplate} from "./view/price.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormListTemplate} from "./view/form-list.js";
import {createNewFormElementTemplate} from "./view/form-creator.js";
import {createFormEditorTemplate} from "./view/form-editor.js";
import {createPointTemplate} from "./view/point.js";
import {generatePoint} from "./mock/point.js";

const TASK_COUNT = 3;
const POINT_COUNT = 15;
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector('.trip-main');
render(tripMain, createInfoTemplate(points), 'afterbegin');

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, createPriceTemplate(points), 'beforeend')

const tripControls = document.querySelector('.trip-controls');
render(tripControls, createMenuTemplate(), 'afterbegin')
render(tripControls, createFiltersTemplate(), 'beforeend')

const tripEvents = document.querySelector('.trip-events');
render(tripEvents, createSortTemplate(), 'afterbegin');
render(tripEvents, createFormListTemplate(), 'beforeend');

const tripEventsList = document.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  if (i === 0) {
    render(tripEventsList, createFormEditorTemplate(points[i]), 'afterbegin')
  } else if (i === 1) {
    render(tripEventsList, createNewFormElementTemplate(points[i]), 'beforeend')
  } else {
    render(tripEventsList, createPointTemplate(points[i]), 'beforeend')
  }
};