import SmartView from "../utils/smart.js";
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

export const createPointTypeListTemplate = (eventType, type, isDisabled) => {
  const pointTypeLowerCase = eventType.toLowerCase();
  const checked = (eventType === type);

  return (
    `<div class="event__type-item">
      <input 
        id="event-type-${pointTypeLowerCase}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${pointTypeLowerCase}"
        ${checked ? `checked` : ``}
        ${isDisabled ? `disabled` : ``}
      >
      <label class="event__type-label  event__type-label--${pointTypeLowerCase}" 
      for="event-type-${pointTypeLowerCase}-1">${eventType}
      </label>
    </div>`
  );
};

export const createCitiesTemplate = (destinations) => {
  return destinations.map(({name}) =>
    `<option value=${name}></option>`);
};

export const createPhotosTemplate = (photos) => {
  return photos.map((photo) =>
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``);
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

const createOfferTemplate = (offerType, isDisabled) => {
  const offerTemplate = offerType.map((offer, index) => {
    const {title, price} = offer;
    const id = `event-offer-${title}-${index}`;

    return (
      `<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="${id}" 
          type="checkbox" 
          name="event-offer-${title}"
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

export const createOffersTemplate = (offerType, isDisabled) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferTemplate(offerType, isDisabled)}
      </div>
    </section>`
  );
};

const createNewFormElementTemplate = (point, offers, destinations) => {
  const {type,
    date: {start, finish},
    destination: {city, pictures, description},
    isDisabled,
    isDeleting,
    isSaving
  } = point;

  const destinationCities = createCitiesTemplate(destinations);

  const typesTemplate = offers.map((elem) => createPointTypeListTemplate(elem.type, type, isDisabled)).join(``);

  const offersForThisType = offers.filter((offer) => offer.type === type.toLowerCase())[0].offers;

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
              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="" required>
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
        ${offersForThisType.length ? createOffersTemplate(offersForThisType, isDisabled) : ``}
        ${createDestinationTemplate(description, photoTemplate)}
      </section>
    </form>
  </li>`;
};

export default class FormCreator extends SmartView {
  constructor(point, offers, destinations) {
    super();
    this._offers = offers;
    this._destinations = destinations;
    this._datepickerStartDate = null;
    this._datepickerEndDate = null;
    this._data = FormCreator.parsePointToData(point, this._offers, this._destinations);

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
    return createNewFormElementTemplate(this._data, this._offers, this._destinations);
  }

  static parsePointToData(point, offers, destinations) {
    const selectedOffers = JSON.parse(JSON.stringify(point.offers));
    const offerType = offers.filter(({type}) => type === point.type.toLowerCase())[0].offers;
    const {name, description, pictures} = destinations[0];

    return Object.assign(
        {},
        point,
        {
          offerType,
          selectedOffers,
          destination: {
            city: name,
            description,
            pictures,
          },
          isDisabled: false,
          isSaving: false,
          isDeleting: false
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
    data = Object.assign({},
        data,
        {
          offers: data.offers,
        }
    );
    delete data.offerType;
    delete data.selectedOffers;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

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
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setFormCloseHandler(callback) {
    this._callback.closeForm = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._setFormCloseHandler);
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
      this.updateData(
          {
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
          enableTime: true,
          defaultDate: this._data.date.start.toDate(),
          onChange: this._startDateChangeHandler
        }
    );

    this._datepickerEndDate = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          enableTime: true,
          minDate: this._data.date.start.toDate(),
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

  reset(point, offers) {
    this.updateData(FormCreator.parsePointToData(point, offers));
  }
}
