import Info from "./view/info.js";
import Price from "./view/price.js";
import Menu from "./view/menu.js";
import Filters from "./view/filters.js";
import Sort from "./view/sort.js";
import FormList from "./view/form-list.js";
import FormCreator from "./view/form-creator.js";
import FormEditor from "./view/form-editor.js";
import Point from "./view/point.js";
import noPoint from "./view/no-point.js"
import {generatePoint} from "./mock/point.js";
import {render, RenderPosition} from "./utils.js";

const TASK_COUNT = 15;

const renderPoint = (pointListElement, point) => {
  const pointComponent = new Point(point);
  const pointEditComponent = new FormEditor(point);

  const replacePointToEdit = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceEditToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
}

const points = new Array(TASK_COUNT).fill().map(generatePoint);

const tripMain = document.querySelector('.trip-main');
render(tripMain, new Info(points).getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, new Price(points).getElement(), RenderPosition.BEFOREEND);

const tripControls = document.querySelector('.trip-controls');
render(tripControls, new Menu().getElement(), RenderPosition.What);
render(tripControls, new Filters().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector('.trip-events');
const PointList = new FormList();
render(tripEvents, new Sort().getElement(), RenderPosition.AFTERBEGIN);

if (TASK_COUNT < 1) {
  render(tripEvents, new noPoint().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEvents, PointList.getElement(), RenderPosition.BEFOREEND);
};

const tripEventsList = document.querySelector('.trip-events__list');
const editPoint = document.querySelectorAll('.event__rollup-btn');

for (let i = 0; i < TASK_COUNT; i++) {
  renderPoint(PointList.getElement(), points[i]);
};
