import { getActiveMap } from './page-states.js';
import { errorReceptionData, onResetForm, onSubmitForm } from './form-submit.js';
import { onClickType, onHousingPrice, onHousingRooms, onHousingGuests, onHousingFeatures } from './filter.js';
import { debounce } from './debounce.js';

const TIME_DEBOUNCE = 500;

const getData = ( onSuccess ) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if ( response.ok ) {
        getActiveMap();
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(( hotels ) => {
      onSuccess( hotels );
      onClickType( debounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      onHousingPrice( debounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      onHousingRooms( debounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      onHousingGuests( debounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      onHousingFeatures( debounce( () => onSuccess( hotels ), TIME_DEBOUNCE ) );
      onResetForm( () => onSuccess( hotels ) );
      onSubmitForm( () => onSuccess( hotels ) );
    })
    .catch(() => {
      errorReceptionData();
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
