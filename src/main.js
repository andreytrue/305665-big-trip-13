import InfoView from "./view/info.js";
import PriceView from "./view/price.js";
import MenuView from "./view/menu.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
// import {generatePoint} from "./mock/point.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatsView from "./view/stats.js";
import Api from "./api.js";
import {render, RenderPosition, POINT_COUNT, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./utils/const.js";

const AUTHORIZATION = `Basic sdfsd10129fsdfc`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

// const points = new Array(POINT_COUNT).fill().map(generatePoint);
const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
// pointsModel.setPoints(points);

const tripMain = document.querySelector('.trip-main');
const tripInfo = document.querySelector('.trip-info');
// render(tripMain, new InfoView(points), RenderPosition.AFTERBEGIN);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});


// render(tripInfo, new PriceView(points), RenderPosition.BEFOREEND);

const siteMenuComponent = new MenuView();
let statsComponent = null;

const tripControls = document.querySelector('.trip-controls');

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(tripEvents, statsComponent, RenderPosition.BEFOREEND);
      break;
    default:
      tripPresenter.init();
      remove(statsComponent);
      break;
  }
};

tripPresenter.init();
filterPresenter.init();

api.getPoints().then((points) => {
  console.log(points);
})
api.getDestinations().then((destinations) => {
  console.log(destinations)
})
api.getOffers().then((offers) => {
  console.log(offers)
})

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(tripControls, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(tripControls, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
