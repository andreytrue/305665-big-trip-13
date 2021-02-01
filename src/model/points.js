import dayjs from 'dayjs';
import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();

    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = this._points.map((point, i) => i === index ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexesting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          type: point.type,
          price: point.base_price,
          date: {
            start: dayjs(point.date_from),
            finish: dayjs(point.date_to),
          },
          isFavorite: point.is_favorite,
          destination: Object.assign(
              {},
              point.destination,
              {
                city: point.destination.name
              }
          )
        }
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.destination.name;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "type": point.type,
          "base_price": +point.price,
          "date_from": point.date.start.toDate().toISOString(),
          "date_to": point.date.finish.toDate().toISOString(),
          "is_favorite": point.isFavorite,
          "destination": {
            "name": point.destination.city,
            "description": point.destination.description,
            "pictures": point.destination.pictures
          }
        }
    );

    delete adaptedPoint.eventType;
    delete adaptedPoint.price;
    delete adaptedPoint.date;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.destination.city;

    return adaptedPoint;
  }
}
