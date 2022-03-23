const TRANSLATE_VALUE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const photosAddElement = ( hotelCard, item ) => {
  const photoList = hotelCard.querySelector('.popup__photos');
  const photoElement = photoList.querySelector('.popup__photo');
  const arrayPhotos = item.offer.photos;

  if ( !arrayPhotos ) {
    return photoList.remove();
  }

  arrayPhotos.forEach(( itemElement ) => {
    const photoItem = photoElement.cloneNode(true);
    photoItem.src = itemElement;
    photoList.prepend(photoItem);
  });

  photoElement.remove();
};

const featuresApartments = ( hotelCard, item ) => {
  if ( !item.offer.features ) {
    return hotelCard.querySelector('.popup__features').remove();
  }

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

const checkAuthorAvatar = ( hotelCard, item ) => {
  if ( !item.author.avatar ) {
    return hotelCard.querySelector('.popup__avatar').remove();
  }

  hotelCard.querySelector('.popup__avatar').src = item.author.avatar;
};

const checkDescription = ( hotelCard, item ) => {
  if ( item.offer.description === '' ) {
    hotelCard.querySelector('.popup__description').remove();
  }

  hotelCard.querySelector('.popup__description').textContent = item.offer.description;
}


const createHotelCard = (item) => {
  const templateCard = document.querySelector('#card').content.querySelector('.popup');
  const hotelCard = templateCard.cloneNode(true);

  checkAuthorAvatar( hotelCard, item );
  hotelCard.querySelector('.popup__title').textContent = item.offer.title;
  hotelCard.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  hotelCard.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  hotelCard.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  hotelCard.querySelector('.popup__text--address').textContent = item.offer.address;
  hotelCard.querySelector('.popup__type').textContent = TRANSLATE_VALUE[item.offer.type];
  checkDescription( hotelCard, item );
  photosAddElement( hotelCard, item );
  featuresApartments( hotelCard, item );

  return hotelCard;
}

export { createHotelCard };
