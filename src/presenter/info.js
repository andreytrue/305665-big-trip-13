import InfoView from "../view/info.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

export default class InfoPresenter {
  constructor(infoContainer, pointsModel, filterModel) {
    this._infoContainer = infoContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const points = this._pointsModel.getPoints();
    const prevInfoComponent = this._infoComponent;

    this._infoComponent = new InfoView(points);

    if (prevInfoComponent === null) {
      render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  getPoints() {
    const points = this._pointsModel.getPoints();

    return points;
  }

  _handleModelEvent() {
    this.init();
  }
}
