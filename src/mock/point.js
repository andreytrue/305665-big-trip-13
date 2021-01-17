import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";

const SENTENCE_MIN_LENGTH = 1;
const SENTENCE_MAX_LENGTH = 5;
const PHOTOS_MIN_AMOUNT = 1;
const PHOTOS_MAX_AMOUNT = 5;
const PRICE_MIN_VALUE = 100;
const PRICE_MAX_VALUE = 1000;
const TITLE_TEXT = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];
const PRICE_MIN_OFFER = 10;
const PRICE_MAX_OFFER = 100;
const OFFERS_MAX_AMOUNT = 5;
const DATE_MAX_MINUTES = 60;
const DATE_MAX_HOURS = 24;
const DATE_MAX_DAYS = 2;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateType = () => {
  const type = [
    `Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, type.length - 1);

  return type[randomIndex];
};

const generateEndlessCity = () => {
  const city = [
    `Reykjavik`, `Tokyo`, `New York`, `London`
  ];

  const randomIndex = getRandomInteger(0, city.length - 1);

  return city[randomIndex];
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

const generateOffer = () => {
  const randomSizeOffer = getRandomInteger(1, OFFERS_MAX_AMOUNT);
  let offers = [];

  for (let i = 0; i < randomSizeOffer; i++) {
    offers.push({
      price: getRandomInteger(PRICE_MIN_OFFER, PRICE_MAX_OFFER),
      title: TITLE_TEXT[i]
    });
  }

  return offers;
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
  return {
    id: generateId(),
    type: generateType(),
    city: generateEndlessCity(),
    date: getDate(),
    price: getRandomInteger(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
    description: generateDescription(),
    photo: generatePhoto(),
    offers: generateOffer(),
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
