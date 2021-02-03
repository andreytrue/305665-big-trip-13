import TaskEditView from "../view/point-creator.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, KeyItem, DEFAULT_POINT} from "../utils/const.js";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(offers, destinations) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new TaskEditView(DEFAULT_POINT, offers, destinations);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === KeyItem.ESCAPE || evt.key === KeyItem.ESC) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
