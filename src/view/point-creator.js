import {getRandomInteger} from "../utils/common.js";
import SmartView from "../utils/smart.js";

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
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offers.map((offer, index) => {
      const {title, name, price} = offer;
      const id = `event-offer-${title}-${index}`;
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" 
          id="${id}" 
          type="checkbox" 
          name="event-offer-${title}"
          ${getRandomInteger(0, 1) ? `checked` : ``}>
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

const createNewFormElementTemplate = (point) => {
  const {type, cities, city, price, destinations} = point;
  const destinationCities = createCitiesTemplate(cities);
  const defaultCity = destinations.city[0];
  const descriptionForThisCity = destinations.find(({location}) => location === defaultCity);
  const photoTemplate = descriptionForThisCity.photos.length ? createPhotosTemplate(descriptionForThisCity.photos) : ``;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            ${`&euro; ` + price}
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${type.length ? createOfferTemplate(type) : ``}
        ${createDestinationTemplate(descriptionForThisCity.description, photoTemplate)}      
      </section>
    </form>`;
};

export default class FormCreator extends SmartView {
  constructor(point) {
    super();
    this._data = FormCreator.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._setFormCloseHandler = this._setFormCloseHandler.bind(this);
    this._eventTypeHandler = this._eventTypeHandler.bind(this);
    this._distinationHandler = this._distinationHandler.bind(this);
    this._offersHandler = this._offersHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewFormElementTemplate(this._point);
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

    if (this._data.offerType.length) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._offersHandler);
    }
  }

  reset(point) {
    this.updateData(FormCreator.parsePointToData(point));
  }
}
