import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

const SENTENCE_MIN_LENGTH = 1;
const SENTENCE_MAX_LENGTH = 5;

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

const PHOTOS_MIN_AMOUNT = 1;
const PHOTOS_MAX_AMOUNT = 5;

const generatePhoto = () => {
  const photos = [];
  const randomAmount = getRandomInteger(PHOTOS_MIN_AMOUNT, PHOTOS_MAX_AMOUNT);

  for (let i = 0; i < randomAmount; i++) {
    const randomPhoto = getRandomInteger(1, 100);
    photos[i] = `http://picsum.photos/248/152?r=` + randomPhoto;
  }

  return photos;
};

const generateDate = () => {
  const maxDaysGap = 4;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const isDate = dayjs().add(daysGap, `day`).toDate();

  return dayjs(isDate).format(`DD/MM/YYYY:H:m`);
};

const PRICE_MIN_VALUE = 10;
const PRICE_MAX_VALUE = 10;

export const generatePoint = () => {
  const offers = {};

  return {
    type: generateType(),
    city: generateEndlessCity(),
    date: generateDate(),
    price: getRandomInteger(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
    description: generateDescription(),
    photo: generatePhoto(),
    offers,
    isFavorite: false
  };
};
