import { formPage } from './page-states.js';
import { inputPrice, inputTitle } from './validation-form.js';
import { sliderElement } from './slider.js';
import { mainPinMarker, map } from './map-hotels.js';
import { sendData } from './api.js';

//Обработчик на Escape
const onClosePopupEsc = ( evt ) => {
  const error = document.querySelector('.error');
  if ( evt.key === 'Escape' ) {
    error.remove();
    document.removeEventListener('keydown', onClosePopupEsc );
  }
};

//Сообщения об отправке
const successMessage = () => {
  const templateCard = document.querySelector( '#success' ).content.querySelector( '.success' );
  const success = templateCard.cloneNode( true );

  document.body.append( success );

  setTimeout(() => {
    success.remove();
  }, 1000);
};

const errorMessage = () => {
  const templateCard = document.querySelector( '#error' ).content.querySelector( '.error' );
  const error = templateCard.cloneNode( true );
  const button = error.querySelector( '.error__button' );

  button.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', onClosePopupEsc );
  });

  error.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', onClosePopupEsc );
  });

  document.addEventListener('keydown', onClosePopupEsc );

  document.body.append(error);
};

//Приведение формы в изначальное состояние
const getInitialState = () => {
  mainPinMarker.setLatLng({
    lat: 35.692429,
    lng: 139.776915,
  });

  map.setView({
    lat: 35.692429,
    lng: 139.776915,
  }, 12);

  formPage.reset();
  inputPrice.setAttribute( 'value', '5000' );
  sliderElement.noUiSlider.set( 5000 );

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
const resetButton = document.querySelector( '.ad-form__reset' );

resetButton.addEventListener('click', () => {
  getInitialState();
});

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

export { setHotelFormSubmit, getInitialState };
