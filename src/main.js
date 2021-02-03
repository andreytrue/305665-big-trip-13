import MenuView from "./view/menu.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatsView from "./view/stats.js";
import InfoPresenter from "./presenter/info.js";
import Api from "./api.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType} from "./utils/const.js";

const AUTHORIZATION = `Basic sdfsd10129fsdfc`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const siteMenuComponent = new MenuView();
let statsComponent = null;

const tripControls = document.querySelector('.trip-controls');

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);
const infoPresenter = new InfoPresenter(tripMain, pointsModel, filterModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(tripEvents, statsComponent, RenderPosition.BEFOREEND);
      break;
    default:
      tripPresenter.init();
      infoPresenter.init();
      remove(statsComponent);
      break;
  }
};

tripPresenter.init();
filterPresenter.init();

Promise
  .all([
    api.getPoints(),
    api.getDestinations(),
    api.getOffers()
  ])
  .then(([points, destinations, offers]) => {
    pointsModel.setDestinations(destinations);
    pointsModel.setOffers(offers);
    pointsModel.setPoints(UpdateType.INIT, points);
    render(tripControls, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setDestinations([]);
    pointsModel.setOffers([]);
    pointsModel.setPoints(UpdateType.INIT, []);
    render(tripControls, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
