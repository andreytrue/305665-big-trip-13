import InfoView from "./view/info.js";
import PriceView from "./view/price.js";
import MenuView from "./view/menu.js";
import FiltersView from "./view/filters.js";
import TripPresenter from "./presenter/trip.js";
import {generatePoint} from "./mock/point.js";
import {render, RenderPosition, POINT_COUNT} from "./utils/render.js";

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const tripMain = document.querySelector('.trip-main');
render(tripMain, new InfoView(points), RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, new PriceView(points), RenderPosition.BEFOREEND);

const tripControls = document.querySelector('.trip-controls');
render(tripControls, new MenuView(), RenderPosition.AFTERBEGIN);
render(tripControls, new FiltersView(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents);

tripPresenter.init(tripEvents, points);
