import dayjs from "dayjs";
import flatpickr from 'flatpickr';
import he from 'he';
import {createPointTypeListTemplate, createCitiesTemplate, createPhotosTemplate, createDestinationTemplate} from "./point-creator.js";
import SmartView from "../utils/smart.js";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createOfferTemplate = (offerType, offers, isDisabled) => {
  const offerTemplate = offerType.map((offer, index) => {
    const {title, price} = offer;
    const id = `event-offer-${title}-${index}`;
    const checked = offers.some((elem) => elem.title === offer.title);

    return (
      `<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="${id}" 
          type="checkbox" 
          name="event-offer-${title}"
          ${checked ? `checked` : ``}
          ${isDisabled ? `disabled` : ``}
        >
        <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join(``);

  return offerTemplate;
};

export const createOffersTemplate = (offerType, offers, isDisabled) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferTemplate(offerType, offers, isDisabled)}
      </div>
    </section>`
  );
};

const createFormEditorTemplate = (point, types, destinations) => {
  const {
    type,
    destination: {city, description, pictures},
    price,
    offers,
    date: {start, finish},
    isDisabled,
    isSaving,
    isDeleting
  } = point;

  const typeList = types.map((elem) => createPointTypeListTemplate(elem.type, type, isDisabled)).join(``);

  const offersForThisType = types.filter((offer) => offer.type === type)[0].offers;

  const destinationCities = createCitiesTemplate(destinations, isDisabled);

  const photoTemplate = pictures.length ? createPhotosTemplate(pictures) : ``;

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
              ${typeList}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
          <datalist id="destination-list-1">
            ${destinationCities}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTimeFull}" ${isDisabled ? `disabled` : ``}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTimeFull}" ${isDisabled ? `disabled` : ``}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}" required>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSaving ? `disabled` : ``}>
          ${isSaving ? `Saving...` : `Save`}
        </button>
        <button class="event__reset-btn" type="reset" ${isDeleting ? `disabled` : ``}>
          ${isDeleting ? `Deleting...` : `Delete`}
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersForThisType.length ? createOffersTemplate(offersForThisType, offers, isDisabled) : ``}
        ${createDestinationTemplate(description, photoTemplate)}
      </section>
    </form>
  </li>`;
};


export default class FormEditor extends SmartView {
  constructor(point, offers, destinations) {
    super();
    this._offers = offers;
    this._destinations = destinations;
    this._datepickerStartDate = null;
    this._datepickerEndDate = null;
    this._data = FormEditor.parsePointToData(point, this._offers);

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
    return createFormEditorTemplate(this._data, this._offers, this._destinations);
  }

  static parsePointToData(point, offers) {
    const selectedOffers = JSON.parse(JSON.stringify(point.offers));
    const offerType = offers.filter(({type}) => type === point.type)[0].offers;

    return Object.assign(
        {},
        point,
        {
          offerType,
          selectedOffers,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({},
        data,
        {
          offers: data.selectedOffers
        }
    );
    delete data.offerType;
    delete data.selectedOffers;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm(FormEditor.parseDataToPoint(this._data));
  }

  _setFormCloseHandler(evt) {
    evt.preventDefault();
    this._callback.closeForm();
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
    this._setDatepicker();
    this.setFormCloseHandler(this._callback.formClose);
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

    const offerType = this._offers.filter(({type}) => type === evt.target.value)[0].offers;

    this.updateData({type: evt.target.value, offerType, selectedOffers: []});
  }

  _destinationHandler(evt) {
    evt.preventDefault();
    if (!this._destinations.some((destination) => destination.name === evt.target.value)) {
      this.getElement()
        .querySelector(`.event__input--destination`)
        .setCustomValidity(`Введите город из списка`);
    } else {
      const selectDestination = (this._destinations.find(({name}) => name === evt.target.value));
      this.getElement()
        .querySelector(`.event__input--destination`)
        .setCustomValidity(``);
      this.updateData({
        destination: {
          city: evt.target.value,
          description: selectDestination.description,
          pictures: selectDestination.pictures,
        },
      });
    }
  }

  _priceHandler(evt) {
    evt.preventDefault();
    this.updateData({price: evt.target.value}, true);
  }

  _offersHandler(evt) {
    evt.preventDefault();
    if (this._data.selectedOffers.some(({title}) => `event-offer-${title}` === evt.target.name)) {
      this._data.selectedOffers = this._data.selectedOffers.filter(({title}) => `event-offer-${title}` !== evt.target.name);
    } else {
      this._data.selectedOffers.push(this._data.offerType.find(({title}) => `event-offer-${title}` === evt.target.name));
    }
    this.updateData({offers: this._data.selectedOffers}, true);
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
          enableTime: true,
          onChange: this._startDateChangeHandler
        }
    );

    this._datepickerEndDate = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.date.finish.toDate(),
          enableTime: true,
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
    this._callback.deleteClick(FormEditor.parseDataToPoint(this._data));
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

  reset(point, offers) {
    this.updateData(FormEditor.parsePointToData(point, offers));
  }
}
