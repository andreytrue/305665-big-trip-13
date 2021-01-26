import SmartView from "../utils/smart.js";
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {DEFAULT_POINT} from "../mock/point.js";

export const createPointTypeListTemplate = (eventType, isChecked) => {
  const pointTypeLowerCase = eventType.toLowerCase();

  return (
    `<div class="event__type-item">
      <input 
        id="event-type-${pointTypeLowerCase}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${pointTypeLowerCase}" 
        ${isChecked ? `checked` : ``}
      >
      <label class="event__type-label  event__type-label--${pointTypeLowerCase}" 
      for="event-type-${pointTypeLowerCase}-1">${eventType}
      </label>
    </div>`
  );
};

export const createCitiesTemplate = (cities) => {
  return cities.map(({city}) =>
    `<option value=${city}></option>`);
};

export const createPhotosTemplate = (photos) => {
  return photos.map((photo) =>
    `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};

export const createDestinationTemplate = (description, photos) => {
  if (description.length || photos) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photos}
          </div>
        </div>
      </section>`
    );
  }

  return ``;
};

const createOfferTemplate = (offers) => {
  const offerTemplate = offers.map((offer, index) => {
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
  }).join(``);

  return offerTemplate;
};

export const createOffersTemplate = (offers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferTemplate(offers)}
      </div>
    </section>`
  );
};

const createNewFormElementTemplate = (point) => {
  const {POINT_TYPES, type, city, price, destinations, offerType, date: {start, finish}} = point;
  const destinationCities = createCitiesTemplate(destinations);
  const descriptionForThisCity = destinations.find((destination) => destination.city === city);
  const photoTemplate = descriptionForThisCity.photos.length ? createPhotosTemplate(descriptionForThisCity.photos) : ``;

  const startTimeFull = dayjs(start).format(`YYYY-MM-DD HH:mm`);
  const endTimeFull = dayjs(finish).format(`YYYY-MM-DD HH:mm`);

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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTimeFull}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTimeFull}">
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
        ${offerType.length ? createOffersTemplate(offerType) : ``}
        ${createDestinationTemplate(descriptionForThisCity.description, photoTemplate)}
      </section>
    </form>
  </li>`;
};

export default class FormCreator extends SmartView {
  constructor(point = DEFAULT_POINT) {
    super();
    this._data = FormCreator.parsePointToData(point);
    this._datepickerStartDate = null;
    this._datepickerEndDate = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._setFormCloseHandler = this._setFormCloseHandler.bind(this);
    this._eventTypeHandler = this._eventTypeHandler.bind(this);
    this._destinationHandler = this._destinationHandler.bind(this);
    this._priceHandler = this._priceHandler.bind(this);
    this._offersHandler = this._offersHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createNewFormElementTemplate(this._data);
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
    this._callback.submitForm(FormCreator.parseDataToPoint(this._data));
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
    this._callback.formSubmit(FormCreator.parseDataToPoint(this._data));
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
    this._setDatepicker();
    // this.setFormCloseHandler(this._callback.formClose);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

  _setDatepicker() {
    if (this._datepickerStartDate) {
      this._datepickerStartDate.destroy();
      this._datepickerStartDate = null;
    }

    if (this._datepickerEndDate) {
      this._datepickerEndDate.destroy();
      this._datepickerEndDate = null;
    }

    this._datepickerStartDate = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.date.start.toDate(),
          onChange: this._startDateChangeHandler
        }
    );

    this._datepickerEndDate = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.date.finish.toDate(),
          onChange: this._endDateChangeHandler
        }
    );
  }

  _startDateChangeHandler(userDate) {
    this.updateData({
      date: {
        start: dayjs(userDate),
        finish: dayjs(userDate),
      },
    }, true);
    this._datepickerStartDate.set(userDate);
    this._datepickerEndDate.set(`minDate`, this._data.date.start.toDate());
  }

  _endDateChangeHandler(userDate) {
    this.updateData({
      date: {
        start: this._data.date.start,
        finish: dayjs(userDate),
      },
    }, true);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormCreator.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._formDeleteClickHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStartDate) {
      this._datepickerStartDate.destroy();
      this._datepickerStartDate = null;
    }

    if (this._datepickerEndDate) {
      this._datepickerEndDate.destroy();
      this._datepickerEndDate = null;
    }
  }

  reset(point) {
    this.updateData(FormCreator.parsePointToData(point));
  }
}
