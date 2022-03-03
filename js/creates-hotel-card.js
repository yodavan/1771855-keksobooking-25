import { getRandomNumber, getRandomNumberFloat } from './utils.js';

// Данные
const OFFER = {
  avatar: 'img/avatars/user0.png',
  title: ['Отель 5 звезд','Отель 4 звезды','Отель 3 звезды','Отель 2 звезды'],
  address: ['location.lat','location.lng'],
  type: ['palace','flat','house','bungalow','hotel'],
  checkin: ['12:00','13:00','14:00'],
  checkout: ['12:00','13:00','14:00'],
  features: ['wifi','dishwasher','parking','washer','elevator','conditioner'],
  description: ['Спальня','Столовая','Кухня','Гостинная'],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};
const { avatar, title, address, type, checkin, checkout, features, description, photos } = OFFER;

//Offer переменные
const NUMBER_DATA = {
  priceMin: 1000,
  priceMax: 7000,
  roomsMin: 10,
  roomsMax: 20,
  guestsMin: 1,
  guestsMax: 10,
};
const { priceMin, priceMax, roomsMin, roomsMax, guestsMin, guestsMax } = NUMBER_DATA;

//Location переменные
const LOCATION = {
  latMin: 35.65000,
  latMax:  35.70000,
  lngMin: 139.70000,
  lngMax: 139.80000,
  locationNumberFloat: 5,
};
const { latMin, latMax, lngMin, lngMax, locationNumberFloat } = LOCATION;

const NUMBER_HOTEL_ELEMENTS = 3;

// Функция - массив случайной длины
const getRandomLengthArray = ( elements ) => {
  const lengthOfArray = getRandomNumber( 1, elements.length );
  const array = [];

  for ( let index = array.length; index < lengthOfArray; index++ ) {
    const indexOfEl = getRandomNumber( 0, elements.length - 1 );
    const el = elements[ indexOfEl ];

    if (!array.includes( el )) {
      array.push( el );
    }
  }
  return array;
};

// Функция - замены цифры в строке
const replacingNumberInString = ( string ) => {
  const min = 1;
  const max = 10;
  let output = '';
  const randomNumber = getRandomNumber( min, max );
  const stringNull = '0';

  const stringNumberAvatar = ( randomNumber < max ) ? stringNull + randomNumber : randomNumber;

  for ( let i = 0; i < string.length; i++ ) {

    const outputSign = string[ i ];

    if ( outputSign === '0' ) {
      output += stringNumberAvatar;
    } else {
      output += outputSign;
    }
  }
  return output;
};

// Функция рандомного выбора элемента из массива
const getRandomElement = ( array ) => array[ getRandomNumber( 0, array.length - 1) ];

// Собирает объект из данных и функций
const createHotelCard = () => ({
  author: {
    avatar: replacingNumberInString(avatar),
  },
  offer: {
    title: getRandomElement(title),
    address: getRandomElement(address),
    price: getRandomNumber(priceMin, priceMax),
    type: getRandomElement(type),
    rooms: getRandomNumber(roomsMin, roomsMax),
    guests: getRandomNumber(guestsMin, guestsMax),
    checkin: getRandomElement(checkin),
    checkout: getRandomElement(checkout),
    features: getRandomLengthArray(features),
    description: getRandomElement(description),
    photos: getRandomLengthArray(photos),
  },
  location: {
    lat: getRandomNumberFloat(latMin, latMax, locationNumberFloat),
    lng: getRandomNumberFloat(lngMin , lngMax, locationNumberFloat),
  },
});

const similarHotelCard = () => Array.from({length: NUMBER_HOTEL_ELEMENTS}, createHotelCard);

export {similarHotelCard};
