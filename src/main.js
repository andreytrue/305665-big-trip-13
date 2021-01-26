import InfoView from "./view/info.js";
import PriceView from "./view/price.js";
import MenuView from "./view/menu.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {generatePoint} from "./mock/point.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, POINT_COUNT} from "./utils/render.js";

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');
render(tripMain, new InfoView(points), RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, new PriceView(points), RenderPosition.BEFOREEND);

const tripControls = document.querySelector('.trip-controls');
render(tripControls, new MenuView(), RenderPosition.AFTERBEGIN);

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
