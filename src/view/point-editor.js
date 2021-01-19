import {createPointTypeListTemplate, createCitiesTemplate, createPhotosTemplate, createDestinationTemplate} from "./point-creator.js";
import SmartView from "../utils/smart.js";

const createOfferTemplate = (offers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offers.map((offer, index) => {
      const {title, name, price, checked} = offer;
      const id = `event-offer-${title}-${index}`;
      return (
        `<div class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="${id}" 
            type="checkbox" 
            name="event-offer-${title}"
            ${checked ? `checked` : ``}
          >
          <label class="event__offer-label" for="${id}">
            <span class="event__offer-title">${name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
      );
    }).join(``)}
    </div>
    </section>`
  );
};

const createFormEditorTemplate = (point) => {
  const {POINT_TYPES, type, city, price, destinations, offerType} = point;
  const destinationCities = createCitiesTemplate(destinations);
  const descriptionForThisCity = destinations.find((destination) => destination.city === city);
  const photoTemplate = descriptionForThisCity.photos.length ? createPhotosTemplate(descriptionForThisCity.photos) : ``;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINT_TYPES.map((elem) => createPointTypeListTemplate(elem, elem.toLowerCase() === type.toLowerCase())).join(``)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationCities}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offerType.length ? createOfferTemplate(offerType) : ``}
        ${createDestinationTemplate(descriptionForThisCity.description, photoTemplate)}
      </section>
    </form>
  </li>`;
};


export default class FormEditor extends SmartView {
  constructor(point) {
    super();
    this._data = FormEditor.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._setFormCloseHandler = this._setFormCloseHandler.bind(this);
    this._eventTypeHandler = this._eventTypeHandler.bind(this);
    this._destinationHandler = this._destinationHandler.bind(this);
    this._priceHandler = this._priceHandler.bind(this);
    this._offersHandler = this._offersHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormEditorTemplate(this._data);
  }

  static parsePointToData(point) {
    const offers = JSON.parse(JSON.stringify(point.offers));
    const offerType = offers.filter((offer) => offer.id.toLowerCase() === point.type.toLowerCase());
    return Object.assign(
        {},
        point,
        {
          offerType,
          offers,
        }
    );
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm(FormEditor.parseDataToPoint(this._data));
  }

  _setFormCloseHandler(evt) {
    evt.preventDefault();
    this._callback.closeForm();
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    delete data.offerType;

    return data;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(FormEditor.parseDataToPoint(this._data));
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, this._formSubmitHandler);
  }

  setPointClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._pointClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormCloseHandler(this._callback.formClose);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  setFormCloseHandler(callback) {
    this._callback.closeForm = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onFormClose);
  }

  _eventTypeHandler(evt) {
    evt.preventDefault();
    for (let offer of this._data.offers) {
      offer.checked = false;
    }
    const offerType = this._data.offers.filter((offer) => offer.id.toLowerCase() === evt.target.value);
    this.updateData({type: evt.target.value, offerType});
  }

  _destinationHandler(evt) {
    evt.preventDefault();
    if (!this._data.CITIES.includes(evt.target.value)) {
      this.getElement()
        .querySelector(`.event__input--destination`)
        .setCustomValidity(`Введите город из списка`);
    } else {
      this.getElement()
        .querySelector(`.event__input--destination`)
        .setCustomValidity(``);
      this.updateData({city: evt.target.value});
    }
  }

  _priceHandler(evt) {
    evt.preventDefault();
    this.updateData({price: evt.target.value}, true);
  }

  _offersHandler(evt) {
    evt.preventDefault();
    const offerElement = this._data.offers.find(({title}) => evt.target.name.includes(title));
    offerElement.checked = offerElement.checked ? false : true;
    this.updateData({offers: this._data.offers}, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._eventTypeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceHandler);

    if (this._data.offerType.length) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._offersHandler);
    }
  }

  reset(point) {
    this.updateData(FormEditor.parsePointToData(point));
  }
}
