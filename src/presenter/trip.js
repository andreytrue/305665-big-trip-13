import SortView from "../view/sort.js";
import TripList from "../view/trip-list.js";
import NoPointView from "../view/no-point.js";
import PointPresenter from "../presenter/point.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition, POINT_COUNT} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sortComponent = new SortView();
    this._tripListComponent = new TripList();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(container, tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._tripListComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (POINT_COUNT < 1) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    for (let i = 0; i < POINT_COUNT; i++) {
      this._renderPoint(this._tripPoints[i]);
    }
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }
}
