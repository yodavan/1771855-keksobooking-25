import { formPage } from './page-states.js';
import { inputPrice, inputTitle } from './validation-form.js';
import { sliderElement } from './slider.js';
import { mainPinMarker, map, getDefaultAddress } from './map-hotels.js';
import { sendData } from './api.js';
import { resetPhoto } from './view-photos.js';

//Ошибка получения данных
const errorReceptionData = () => {
  const templateCard = document.querySelector( '#error' ).content.querySelector( '.error' );
  const error = templateCard.cloneNode( true );
  error.querySelector('.error__message').textContent = 'Данные не получены. Обновите страницу';
  error.querySelector( '.error__button' ).remove();

  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, 1500);
};

//Обработчики на Escape
const onClosePopupEroor = ( evt ) => {
  const error = document.querySelector('.error');
  if ( evt.key === 'Escape' ) {
    error.remove();
    document.removeEventListener('keydown', onClosePopupEroor );
  }
};

const onClosePopupSuccess = ( evt ) => {
  const success = document.querySelector('.success');
  if ( evt.key === 'Escape' ) {
    success.remove();
    document.removeEventListener('keydown', onClosePopupSuccess );
  }
};

//Сообщения об отправке
const successMessage = () => {
  const templateCard = document.querySelector( '#success' ).content.querySelector( '.success' );
  const success = templateCard.cloneNode( true );

  success.addEventListener('click', () => {
    success.remove();
    document.removeEventListener('keydown', onClosePopupSuccess );
  });

  document.addEventListener('keydown', onClosePopupSuccess );

  document.body.append( success );
};

const errorMessage = () => {
  const templateCard = document.querySelector( '#error' ).content.querySelector( '.error' );
  const error = templateCard.cloneNode( true );
  const button = error.querySelector( '.error__button' );

  button.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', onClosePopupEroor );
  });

  error.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', onClosePopupEroor );
  });

  document.addEventListener('keydown', onClosePopupEroor );

  document.body.append(error);
};

//Приведение формы в изначальное состояние
const getInitialState = () => {
  const mapFiltersForm = document.querySelector('.map__filters');
  mainPinMarker.setLatLng({
    lat: 35.692429,
    lng: 139.776915,
  });

  map.setView({
    lat: 35.692429,
    lng: 139.776915,
  }, 12);

  mapFiltersForm.reset();
  formPage.reset();
  inputPrice.setAttribute( 'value', '5000' );
  sliderElement.noUiSlider.set( 5000 );
  getDefaultAddress();
  resetPhoto();

  const popup = document.querySelector( '.leaflet-popup' );
  if ( popup ) {
    popup.remove();
  }
};

//Отключение/включение button submit
const formSubmit = document.querySelector('.ad-form__submit');
const lockButton = () => {
  formSubmit.disabled = true;
};

const unlockedButton = () => {
  formSubmit.disabled = false;
};

//Очистка формы
const onResetForm = ( element ) => {
  const resetButton = document.querySelector( '.ad-form__reset' );
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    getInitialState();
    element();
  });
};

const onSubmitForm = ( element ) => {
  formPage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    getInitialState();
    element();
  });
};

//Отправка данных на сервер
const setHotelFormSubmit = ( onSuccess ) => {
  formPage.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if ( inputPrice.validity.valid && inputTitle.validity.valid ) {
      lockButton();
      sendData(
        () => {
          onSuccess();
          unlockedButton();
        },
        successMessage,
        () => {
          errorMessage();
          unlockedButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export { setHotelFormSubmit, getInitialState, errorReceptionData, onResetForm, onSubmitForm };
