import {similarHotelCard} from './creates-hotel-card.js';

const TRANSLATE_VALUE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const PHOTOS_ADD_ELEMENT = ( hotelCard, item ) => {
  const photoList = hotelCard.querySelector('.popup__photos');
  const photoElement = photoList.querySelector('.popup__photo');
  const arrayPhotos = item.offer.photos;

  arrayPhotos.forEach(( item ) => {
    const photoItem = photoElement.cloneNode(true);
    photoItem.src = item;
    photoList.prepend(photoItem);
  });

  photoElement.remove();
};

const FEATURES_APARTMENTS = ( hotelCard, item ) => {
  const featureList = hotelCard.querySelectorAll('.popup__feature');

  featureList.forEach( (featureItem) => {
    const isNecessary = item.offer.features.some(
      (features) => featureItem.classList.contains(`popup__feature--${ features }`)
    );

    if (!isNecessary) {
      featureItem.remove();
    }
  });
};

const ARRAY_HOTELS = similarHotelCard();
const LIST_HOTEL_CARDS = document.querySelector('.map__canvas');
const TEMPLATE_CARD = document.querySelector('#card').content;

ARRAY_HOTELS.forEach(( item ) => {
  const hotelCard = TEMPLATE_CARD.cloneNode(true);
  hotelCard.querySelector('.popup__avatar').src = item.author.avatar;
  hotelCard.querySelector('.popup__title').textContent = item.offer.title;
  hotelCard.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  hotelCard.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  hotelCard.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  hotelCard.querySelector('.popup__description').textContent = item.offer.description;
  hotelCard.querySelector('.popup__text--address').textContent = item.offer.address;
  hotelCard.querySelector('.popup__type').textContent = TRANSLATE_VALUE[item.offer.type];
  PHOTOS_ADD_ELEMENT( hotelCard, item );
  FEATURES_APARTMENTS( hotelCard, item );

  LIST_HOTEL_CARDS.appendChild( hotelCard );
});
