import {createInfoTemplate} from "./view/info.js";
import {createPriceTemplate} from "./view/price.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormListTemplate} from "./view/form-list.js";
import {createNewFormElementTemplate} from "./view/form-creator.js";
import {createFormEditorTemplate} from "./view/form-editor.js";
import {createPointTemplate} from "./view/point.js";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector('.trip-main');
render(tripMain, createInfoTemplate(), 'afterbegin');

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, createPriceTemplate(), 'beforeend')

const tripControls = document.querySelector('.trip-controls');
render(tripControls, createMenuTemplate(), 'afterbegin')
render(tripControls, createFiltersTemplate(), 'beforeend')

const tripEvents = document.querySelector('.trip-events');
render(tripEvents, createSortTemplate(), 'afterbegin');
render(tripEvents, createFormListTemplate(), 'beforeend');

const tripEventsList = document.querySelector('.trip-events__list');
render(tripEventsList, createNewFormElementTemplate(), 'beforeend')
render(tripEventsList, createFormEditorTemplate(), 'afterbegin')

for (let i = 0; i < TASK_COUNT; i++) {
  render(tripEventsList, createPointTemplate(), 'beforeend')
};
