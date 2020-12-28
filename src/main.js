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
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 15;

const renderPoint = (pointListElement, point) => {
  const pointComponent = new Point(point);
  const pointEditComponent = new FormEditor(point);

  const replacePointToEdit = () => {
    pointListElement.replaceChild(pointEditComponent, pointComponent);
  };

  const replaceEditToPoint = () => {
    pointListElement.replaceChild(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(()=> {
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setPointClickHandler(() => {
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
}

const points = new Array(TASK_COUNT).fill().map(generatePoint);

const tripMain = document.querySelector('.trip-main');
render(tripMain, new Info(points), RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, new Price(points), RenderPosition.BEFOREEND);

const tripControls = document.querySelector('.trip-controls');
render(tripControls, new Menu(), RenderPosition.AFTERBEGIN);
render(tripControls, new Filters(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector('.trip-events');
const PointList = new FormList();
render(tripEvents, new Sort(), RenderPosition.AFTERBEGIN);

if (TASK_COUNT < 1) {
  render(tripEvents, new noPoint(), RenderPosition.BEFOREEND);
} else {
  render(tripEvents, PointList, RenderPosition.BEFOREEND);
};

const tripEventsList = document.querySelector('.trip-events__list');
const editPoint = document.querySelectorAll('.event__rollup-btn');

for (let i = 0; i < TASK_COUNT; i++) {
  renderPoint(PointList, points[i]);
};
