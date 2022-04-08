import { getActiveMap } from './page-states.js';
import { getErrorReceptionData, getResetForm, getSubmitForm } from './form-submit.js';
import { getTypeHousing, getHousingPrice, getHousingRooms, getNumberGuests, getHousingFeatures } from './filter.js';
import { getDebounce } from './debounce.js';

const TIME_DEBOUNCE = 500;

const getData = ( onSuccess ) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if ( response.ok ) {
        getActiveMap();
        return response.json();
      }
      throw new Error();
    })
    .then(( hotels ) => {
      onSuccess( hotels );
      getTypeHousing( getDebounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      getHousingPrice( getDebounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      getHousingRooms( getDebounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      getNumberGuests( getDebounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      getHousingFeatures( getDebounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      getResetForm( () => onSuccess( hotels ) );
      getSubmitForm( () => onSuccess( hotels ) );
    })
    .catch(() => {
      getErrorReceptionData();
    });
};

const sendData = ( onSuccess, onSending, onFail, body ) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  ).then(( response ) => {
    if ( response.ok ) {
      onSuccess();
      onSending();
    } else {
      throw new Error();
    }
  })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
