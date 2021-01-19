import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";

const POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Reykjavik`, `Tokyo`, `Venice`, `London`, `Paris`, `Beijing`];
const SENTENCE_MIN_LENGTH = 1;
const SENTENCE_MAX_LENGTH = 5;
const PHOTOS_MIN_AMOUNT = 1;
const PHOTOS_MAX_AMOUNT = 5;
const PRICE_MIN_VALUE = 100;
const PRICE_MAX_VALUE = 1000;
const DATE_MAX_MINUTES = 60;
const DATE_MAX_HOURS = 24;
const DATE_MAX_DAYS = 2;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const generateEndlessCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const generateDescription = () => {
  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  let pointDescription = ``;
  const randomAmount = getRandomInteger(SENTENCE_MIN_LENGTH, SENTENCE_MAX_LENGTH);

  for (let i = 0; i < randomAmount; i++) {
    const randomIndex = getRandomInteger(0, description.length - 1);
    pointDescription += description[randomIndex] + ` `;
  }

  return pointDescription;
};

const generatePhoto = () => {
  const photos = [];
  const randomAmount = getRandomInteger(PHOTOS_MIN_AMOUNT, PHOTOS_MAX_AMOUNT);

  for (let i = 0; i < randomAmount; i++) {
    const randomPhoto = getRandomInteger(1, 100);
    photos[i] = `http://picsum.photos/248/152?r=` + randomPhoto;
  }

  return photos;
};

const generateOffers = () => {
  const offerTypes = [
    {id: `Flight`, name: `Add luggage`, price: `50`, title: `luggage`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Switch to comfort`, price: `80`, title: `comfort`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Add meal`, price: `15`, title: `meal`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Choose seats`, price: `5`, title: `seats`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Travel by train`, price: `40`, title: `train`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Taxi`, name: `Order Uber`, price: `20`, title: `uber`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Drive`, name: `Rent a car`, price: `200`, title: `car`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Check-in`, name: `Add breakfast`, price: `50`, title: `breakfast`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Sightseeing`, name: `Book tickets`, price: `40`, title: `tickets`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Sightseeing`, name: `Lunch in city`, price: `30`, title: `lunch`, checked: Boolean(getRandomInteger(0, 1))},
  ];

  return offerTypes;
};

let startEvent = dayjs();

const getDate = () => {
  const days = getRandomInteger(0, DATE_MAX_DAYS);
  const hours = getRandomInteger(0, DATE_MAX_HOURS);
  const minutes = getRandomInteger(0, DATE_MAX_MINUTES);

  const start = startEvent;
  const finish = startEvent.add(days, `d`).add(hours, `h`).add(minutes, `m`);

  startEvent = finish;

  return {
    start,
    finish,
  };
};

export const generatePoint = () => {
  const destinations = [];
  CITIES.forEach((city) => destinations.push({city, description: generateDescription(), photos: generatePhoto()}));

  return {
    id: generateId(),
    POINT_TYPES,
    type: generateType(),
    CITIES,
    city: generateEndlessCity(),
    destination: {
      city: generateEndlessCity(),
      description: generateDescription(),
      photos: generatePhoto()
    },
    destinations,
    date: getDate(),
    price: getRandomInteger(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
    photo: generatePhoto(),
    offers: generateOffers(),
    isFavorite: false
  };
};

export default class Point {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return generatePoint();
  }
}
